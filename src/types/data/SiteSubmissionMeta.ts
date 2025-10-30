import type { BoundarySelectionMethods } from "../enums/BoundarySelectionMethods";
import type { DateTime } from "../from-odp/utils";

/**
 * @id site-submission-meta
 * @title Site Submission Meta
 * @description Metadata about a site submission.
 * @schema
 */
export interface SiteSubmissionMeta {
  /**
   * The method the user chose to use to draw the boundary
   */
  boundarySelectionMethod: BoundarySelectionMethods;
  /**
   * The date and time the submission was made
   */
  submittedAt: DateTime;
}
