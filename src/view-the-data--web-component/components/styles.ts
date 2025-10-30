import { css } from "lit";

export const printStyle = css`
  @media print {
    body,
    main {
      padding: 0;
      margin: 0;
    }
    main {
      max-width: 100%;
    }
    #header,
    #footer,
    #nav {
      display: none !important;
    }
    :host {
      background: none;
    }
  }
`;

export const componentStyle = css`
  @media screen {
    :host {
      font-family: system-ui;
      background: #f7f9fa;
      display: block;
      padding: 2rem;
      /* font-size: 1.25rem; */
      /* line-height: 1.5; */
    }

    img,
    svg,
    video {
      max-width: 100%;
      display: block;
    }
  }
`;

export const cardContainerStyles = css`
  @media screen {
    .card-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }
  }
`;

export const cardStyles = css`
  @media print {
    .card--responses {
      break-before: page;
      break-after: page;
    }
  }

  @media screen {
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
  }
`;

export const responseStyles = css`
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
`;
