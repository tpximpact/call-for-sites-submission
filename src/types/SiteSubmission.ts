import type { SiteSubmissionMeta } from "./data/SiteSubmissionMeta";
import type { Submitter } from "./data/Submitter";
import type { SiteUses } from "./enums/SiteUses";
import type { YesNoMaybe } from "./enums/YesNoMaybe";
import type { Address } from "./from-odp/Addresses";
import type { Responses } from "./from-odp/Responses";
import type { GeoJSON } from "geojson";
import type { Date } from "./from-odp/utils";

/**
 * @id site-submission
 * @title Site Submission
 * @description A submission of a site for development consideration.
 * @schema
 */
export interface SiteSubmission {
  /**
   * The main data about the site submission
   */
  data: {
    /**
     * Information about the person submitting the site
     */
    submitter: Submitter;

    site: {
      address: Address;
      boundary: GeoJSON;
    };

    // Have you had any pre-application discussions with the council about this site?
    // Provide your pre-application reference
    preApplicationReference?: string;
    // Has this site been submitted or assessed in a site assessment before?
    // Provide the site assessment reference or the date of the previous submission
    siteAssessmentReference?: string;
    previousAssessmentDate?: Date;
    currentUse: SiteUses[];

    // Are any of these statements true about the site?
    existingUseWithLease?: boolean;
    existingUseWithLeaseDetails?: string;
    thirdPartyReliant?: boolean;
    thirdPartyReliantDetails?: string;
    legalDevelopmentImpediments?: boolean;
    legalDevelopmentImpedimentsDetails?: string;
    notableAbnormalCosts?: boolean;
    notableAbnormalCostsDetails?: string;
    neighbouringUseStructuresAffectDevelopment?: boolean;
    neighbouringUseStructuresAffectDevelopmentDetails?: string;
    cannotConnectToUtilities?: boolean;
    cannotConnectToUtilitiesDetails?: string;

    marketInterest?: string;

    // When do you expect the site to be ready for development?
    developmentReady?: string; //month/year
    completionsExpectedOnSite?: string; //month/year

    additionalComments?: string;

    potentialUse: SiteUses[];
    // see https://github.com/theopensystemslab/digital-planning-data-schemas/blob/d6c352255c5e94efeaab69a89fe9a0a2f44eb35a/types/schemas/prototypeApplication/data/Proposal.ts for a way to do this
    // State how many homes or jobs you think the site could accommodate.
    potentialScale: string;
    // Are you willing for this site to be joined with adjacent sites or used for multiple developments?
    // Sometimes it might be better to join sites together or split up ones to make improved development sites.
    siteSplit: YesNoMaybe;
    constraints: {
      // @TODO
      other: string;
    };
    // applications: {
    //   // @TODO what other planning applications on this site
    // };
    access: {
      // Is there existing access to and from the public highway?
      publicHighwayExistingAccess?: boolean;
      publicHighwayAccessProvided?: string;
    };
  };
  /**
   * The original responses associated with this submission
   */
  responses: Responses;
  /**
   * Metadata about this site submission
   */
  meta: SiteSubmissionMeta;
}
