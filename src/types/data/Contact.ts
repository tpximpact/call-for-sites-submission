import type { ContactTypes } from "../enums/ContactTypes";
import type { Other, SiteConnectionsMain } from "../enums/SiteConnections";
import type { ContactDetails } from "../from-odp/Contacts";

/**
 * @id contact_main
 * @title Contact Main
 * @description A contact associated with a site submission.
 * @schema
 */
type ContactMain = ContactDetails & {
  type: ContactTypes;
  /**
   * What is this contacts connection to the site?
   */
  siteConnection: SiteConnectionsMain;
};

/**
 * @id contact_other
 * @title Contact Other
 * @description A contact associated with a site submission with an "other" connection.
 * @schema
 */
type ContactOther = ContactDetails & {
  type: ContactTypes;
  /**
   * What is this contacts connection to the site?
   */
  siteConnection: Other;
  /**
   * If "other" connection selected, please specify your connection to the site
   */
  siteConnectionOther: string;
};

/**
 * @id contact
 * @title Contact
 * @description A contact associated with a site submission.
 * @schema
 */
export type Contact = ContactMain | ContactOther;
