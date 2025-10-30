import type { Contact } from "./Contact";

/**
 * @id submitter
 * @title Submitter
 * @description The person submitting the site on behalf of themselves or an agent.
 * @schema
 */
export type Submitter = Contact & {
  agent?: Contact;
};
