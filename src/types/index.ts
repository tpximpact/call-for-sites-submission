import type { Address } from "./Addresses";
import type { Responses } from "./Responses";
import type { GeoJSON } from "geojson";
import type { Date, DateTime } from "./utils";

export type BoundarySelectionMethods =
  | "draw"
  | "shape-file"
  | "address-lookup"
  | "address-manual";

export type Uses =
  | "Class B2"
  | "Class B8"
  | "Class C1"
  | "Class C2"
  | "Class C2a"
  | "Class C3"
  | "Class C4"
  | "Class E"
  | "Class F1"
  | "Class F2"
  | "Other"
  | "Undeveloped land";

export type Submitter = {
  submitter: boolean;
  name: string;
  email: string;
  telephone: string;
  actingOnBehalf: boolean;
  connectionToSite:
    | "Landowner or landowner's agent"
    | "Developer or developer's agent"
    | "Commercial or business operator"
    | "Local resident"
    | "Community group"
    | "Other";
};

export type Ynm = "yes" | "no" | "maybe";

export interface Data {
  data: {
    submitter: Submitter;
    owners?: Submitter[];
    site: {
      address: Address;
      boundary: GeoJSON;
      // Have you had any pre-application discussions with the council about this site?
      // Provide your pre-application reference
      preApplicationReference?: string;
      // Has this site been submitted or assessed in a site assessment before?
      // Provide the site assessment reference or the date of the previous submission
      siteAssessmentReference?: string;
      previousAssessmentDate?: Date;
      currentUse: Uses[];

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
    };
    future: {
      potentialUse: Uses[];
      // see https://github.com/theopensystemslab/digital-planning-data-schemas/blob/d6c352255c5e94efeaab69a89fe9a0a2f44eb35a/types/schemas/prototypeApplication/data/Proposal.ts for a way to do this
      // State how many homes or jobs you think the site could accommodate.
      potentialScale: string;
      // Are you willing for this site to be joined with adjacent sites or used for multiple developments?
      // Sometimes it might be better to join sites together or split up ones to make improved development sites.
      siteSplit: Ynm;
    };
    constraints: {
      // @TODO
      other: string;
    };
    applications: {
      // @TODO what other planning applications on this site
    };
    access: {
      // Is there existing access to and from the public highway?
      publicHighwayExistingAccess?: boolean;
      publicHighwayAccessProvided?: string;
    };
  };
  responses: Responses; // get this from ODP repo
  meta: {
    /**
     * The method used to draw the boundary
     */
    boundarySelectionMethod: BoundarySelectionMethods;
    submittedAt: DateTime;
  };
}
