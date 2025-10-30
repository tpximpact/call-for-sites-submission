/**
 * @id contact_types
 * @title Contact Types
 * @description Which of these best describes you (or your organisation)?
 * @schema
 *
 * Which of these best describes you (or your organisation)?
 * individual: Private individual
 * company: Company
 * charity: Charity
 * public: Public sector organisation
 * parishCouncil: Parish or community council
 */
export type ContactTypes =
  | "individual"
  | "company"
  | "charity"
  | "public"
  | "parishCouncil";
