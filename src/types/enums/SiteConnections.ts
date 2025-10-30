export type LandOwner = "landOwner";
export type PropertyOwner = "propertyOwner";
export type Developer = "developer";
export type Commercial = "commercial";
export type LocalResident = "localResident";
export type CommunityGroup = "communityGroup";
export type Other = "other";

/**
 * What is your connection to the site?
 * landOwner: Land owner
 * propertyOwner: Property owner
 * developer: Developer
 * commercial: Commercial or business operator
 * localResident: Local resident
 * communityGroup: Community group
 * other: Other
 */
export type SiteConnections =
  | LandOwner
  | PropertyOwner
  | Developer
  | Commercial
  | LocalResident
  | CommunityGroup
  | Other;

/**
 * What is your connection to the site? (excluding "other")
 */
export type SiteConnectionsMain =
  | LandOwner
  | PropertyOwner
  | Developer
  | Commercial
  | LocalResident
  | CommunityGroup;
