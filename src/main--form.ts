import "./style.css";
import type { Data } from "./types";

function setupForm(form: HTMLFormElement) {
  let data: Data = {};
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    data.data.contact.name = (formData.get("name") as string) || "";
    data.data.contact.email = (formData.get("email") as string) || "";
    data.data.contact.telephone = (formData.get("telephone") as string) || "";
    data.data.contact.actingOnBehalf = formData.has("actingOnBehalf");
    console.log("Form submitted!", data);
  });
}

const form = document.querySelector<HTMLFormElement>("form#sites");

if (form) {
  setupForm(form);
}
