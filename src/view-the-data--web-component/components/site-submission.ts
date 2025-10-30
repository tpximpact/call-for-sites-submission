import { LitElement, html } from "lit";
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
import {
  cardContainerStyles,
  cardStyles,
  componentStyle,
  printStyle,
  responseStyles,
} from "./styles";

const defaultData: SiteSubmissionData = exampleSiteSubmission1;

@customElement("site-submission")
export class SiteSubmission extends LitElement {
  // Define scoped styles right with your component, in plain CSS
  static styles = [
    componentStyle,
    responseStyles,
    cardContainerStyles,
    cardStyles,
    printStyle,
  ];

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
      <div class="card-container">
        <section class="card card--map">
          <canvas
            id="boundary-canvas"
            width="600"
            height="400"></canvas>
        </section>

        <section class="card card--address">
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
