import type { ContactTypes } from "../enums/ContactTypes";
import type { Other, SiteConnections } from "../enums/SiteConnections";
import type { ContactDetails } from "../from-odp/Contacts";

type ContactMain = ContactDetails & {
  type: ContactTypes;
  /**
   * What is this contacts connection to the site?
   */
  siteConnection: Omit<SiteConnections, "other">;
};

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

export type Contact = ContactMain | ContactOther;
