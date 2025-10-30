import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { drawGeoJSON } from "../libs/draw-geojson";
import type {
  QuestionAndResponses,
  Response,
} from "@/types/from-odp/Responses";
import type { SiteSubmission as SiteSubmissionData } from "@/types/SiteSubmission";
import type { Contact } from "@/types/data/Contact";
import type { SiteSubmissionMeta } from "@/types/data/SiteSubmissionMeta";
import { exampleSiteSubmission1 } from "./../example-data";
import type { Address } from "@/types/from-odp/Addresses";

const defaultData: SiteSubmissionData = exampleSiteSubmission1;

@customElement("site-submission")
export class SiteSubmission extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      font-family: "Segoe UI", Arial, sans-serif;
      background: #f7f9fa;
      display: block;
      padding: 2rem;
    }
    .site-data {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
      padding: 1.5rem;
      min-width: 250px;
      flex: 1 1 300px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    .card h2 {
      margin-top: 0;
      color: #0077cc;
      font-size: 1.2rem;
    }
    .card h3 {
      color: #0077cc;
      font-size: 1rem;
    }
    .card table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.5rem;
    }
    .card table td {
      padding: 0.3rem 0.6rem;
      border-bottom: 1px solid #eee;
    }
    .card p {
      margin: 0.4rem 0;
    }
    .card canvas {
      width: 100%;
      height: auto;
      max-width: 100%;
      max-height: 400px;
      display: block;
      margin: 0 auto;
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      background: #f7f9fa;
    }
    .card--responses {
      flex: 0 1 100%;
    }
    .responses-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .response-fieldset {
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 1rem;
      margin: 0;
      background: #f9fbfc;
    }
    .response-fieldset legend {
      font-weight: bold;
      color: #0077cc;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    .response-meta {
      font-size: 0.95em;
      color: #555;
      margin-bottom: 0.3em;
    }
    .response-answers {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }
    .response-answer {
      background: #fff;
      border-radius: 4px;
      padding: 0.5em 0.7em;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
      margin-bottom: 0.2em;
    }
    .response-label {
      font-weight: 500;
      color: #222;
    }
    .response-flags {
      font-size: 0.9em;
      color: #b00;
      margin-left: 0.7em;
    }
    .response-options {
      margin-top: 0.3em;
      font-size: 0.95em;
    }
    .response-options ul {
      margin: 0.2em 0 0 1em;
      padding: 0;
    }
    .response-options li {
      list-style: disc inside;
      margin: 0.1em 0;
    }
    .card--meta {
      flex: 0 1 100%;
      background: #f3f6fa;
      border: 1px solid #e0e0e0;
      margin-bottom: 1rem;
    }
    .card--meta table {
      width: auto;
      margin-top: 0.5rem;
      font-size: 1rem;
    }
    .card--meta td {
      padding: 0.3rem 0.8rem;
      border-bottom: none;
    }
  `;

  // Declare reactive properties
  @property()
  name?: string = "World";

  // configurable component properties
  @property({ type: Object })
  data: SiteSubmissionData = defaultData;

  firstUpdated() {
    const boundary = this.data.data.site.boundary;
    const canvas = this.shadowRoot?.getElementById(
      "boundary-canvas"
    ) as HTMLCanvasElement;
    drawGeoJSON(boundary, canvas);
  }

  private renderResponses(responses: QuestionAndResponses[]) {
    return html`
      <form class="responses-form">
        ${responses.map(
          (q: QuestionAndResponses, idx: number) => html`
            <fieldset class="response-fieldset">
              <legend><strong>Q${idx + 1}:</strong> ${q.question}</legend>
              ${q.metadata?.sectionName
                ? html`<div class="response-meta">
                    <em>Section: ${q.metadata.sectionName}</em>
                  </div>`
                : ""}
              ${q.metadata?.autoAnswered !== undefined
                ? html`<div class="response-meta">
                    Auto Answered:
                    <strong>${q.metadata.autoAnswered ? "Yes" : "No"}</strong>
                  </div>`
                : ""}
              <div class="response-answers">
                ${Array.isArray(q.responses)
                  ? q.responses.map(
                      (r: Response) => html`
                        <div class="response-answer">
                          <label>
                            <span class="response-label">${r.value}</span>
                            ${r.metadata?.flags?.length
                              ? html`<span class="response-flags"
                                  >Flags: ${r.metadata.flags.join(", ")}</span
                                >`
                              : ""}
                            ${r.metadata?.options?.length
                              ? html`
                                  <div class="response-options">
                                    Options:
                                    <ul>
                                      ${r.metadata.options.map(
                                        (opt: string | Response) =>
                                          typeof opt === "string"
                                            ? html`<li>${opt}</li>`
                                            : html`<li>
                                                ${opt.value}${opt.metadata
                                                  ?.flags
                                                  ? ` (Flags: ${opt.metadata.flags.join(
                                                      ", "
                                                    )})`
                                                  : ""}
                                              </li>`
                                      )}
                                    </ul>
                                  </div>
                                `
                              : ""}
                          </label>
                        </div>
                      `
                    )
                  : html`<div class="response-answer">
                      <span>${q.responses}</span>
                    </div>`}
              </div>
            </fieldset>
          `
        )}
      </form>
    `;
  }

  private renderMetadata(metadata: SiteSubmissionMeta) {
    return html`
      <table>
        <tr>
          <td><strong>Submitted At</strong></td>
          <td>
            ${metadata.submittedAt
              ? new Date(metadata.submittedAt).toLocaleString()
              : "Unknown"}
          </td>
        </tr>
        <tr>
          <td><strong>Boundary Selection Method</strong></td>
          <td>${metadata.boundarySelectionMethod}</td>
        </tr>
      </table>
    `;
  }

  private renderContact(contact: Contact) {
    return html`
      <table>
        <tr>
          <td>Name</td>
          <td>
            ${contact.name.title ?? ""}
            ${contact.name.first ? contact.name.first : ""}
            ${contact.name.last ? contact.name.last : ""}
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${contact.email ? contact.email : ""}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>${contact.phone.primary ? contact.phone.primary : ""}</td>
        </tr>
        <tr>
          <td>Company</td>
          <td>${contact.company?.name ?? ""}</td>
        </tr>

        <tr>
          <td>Connection to site</td>
          <td>
            ${contact.siteConnection}
            ${contact.siteConnection === "other" && contact.siteConnectionOther
              ? html` - ${contact.siteConnectionOther}`
              : ""}
          </td>
        </tr>
      </table>
    `;
  }

  private renderAddress(address: Address) {
    return html`
      <table>
        <tr>
          <td>Line 1</td>
          <td>${address.line1}</td>
        </tr>
        <tr>
          <td>Line 2</td>
          <td>${address.line2}</td>
        </tr>
        <tr>
          <td>Town</td>
          <td>${address.town}</td>
        </tr>
        <tr>
          <td>County</td>
          <td>${address.county}</td>
        </tr>
        <tr>
          <td>Postcode</td>
          <td>${address.postcode}</td>
        </tr>
        <tr>
          <td>Country</td>
          <td>${address.country}</td>
        </tr>
      </table>
    `;
  }

  private renderAccess(access: SiteSubmissionData["data"]["access"]) {
    return html`
      <table>
        <tr>
          <td>Existing access to public highway</td>
          <td>
            ${access.publicHighwayExistingAccess === true
              ? "Yes"
              : access.publicHighwayExistingAccess === false
              ? "No"
              : "Unknown"}
          </td>
        </tr>
        <tr>
          <td>Details of access provided to public highway</td>
          <td>${access.publicHighwayAccessProvided ?? "N/A"}</td>
        </tr>
      </table>
    `;
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="site-data">
        <section class="card">
          <canvas
            id="boundary-canvas"
            width="600"
            height="400"></canvas>
        </section>

        <section class="card">
          <h2>Site address</h2>
          ${this.renderAddress(this.data.data.site.address)}
        </section>

        <section class="card ">
          <h2>Constraints</h2>
        </section>

        <section class="card ">
          <h2>Access</h2>
          ${this.renderAccess(this.data.data.access)}
        </section>

        <section class="card ">
          <h2>Applications</h2>
        </section>

        <section class="card">
          <h2>Submitter</h2>
          ${this.renderContact(this.data.data.submitter)}
          ${this.data.data.submitter.agent ? html`<h3>Agent</h3>` : ""}
          ${this.data.data.submitter.agent
            ? this.renderContact(this.data.data.submitter.agent)
            : ""}
        </section>

        <section class="card card--responses">
          <h2>Responses</h2>
          ${this.renderResponses(this.data.responses)}
        </section>

        <section class="card card--meta">
          <h2>Submission Metadata</h2>
          ${this.renderMetadata(this.data.meta)}
        </section>
      </div>
    `;
  }
}
