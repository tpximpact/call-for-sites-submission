import "../common/style.css";

function setupForm(form: HTMLFormElement) {
  let data = {
    data: {
      submitter: {
        name: { title: "", first: "", last: "" },
        email: "",
        phone: { primary: "" },
      },
    },
  };
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    data.data.submitter.name.first = (formData.get("name") as string) || "";
    data.data.submitter.email = (formData.get("email") as string) || "";
    data.data.submitter.phone.primary =
      (formData.get("telephone") as string) || "";
    // data.data.submitter.actingOnBehalf = formData.has("actingOnBehalf");
    console.log("Form submitted!", data);
  });
}

const form = document.querySelector<HTMLFormElement>("form#sites");

if (form) {
  setupForm(form);
}
