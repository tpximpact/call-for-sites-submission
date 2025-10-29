import type { Contact } from "./Contact";

export type Submitter = Contact & {
  agent?: Contact;
};
