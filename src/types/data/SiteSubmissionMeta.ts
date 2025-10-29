import type { BoundarySelectionMethods } from "../enums/BoundarySelectionMethods";
import type { DateTime } from "../from-odp/utils";

export type SiteSubmissionMeta = {
  /**
   * The method the user chose to use to draw the boundary
   */
  boundarySelectionMethod: BoundarySelectionMethods;
  /**
   * The date and time the submission was made
   */
  submittedAt: DateTime;
};
