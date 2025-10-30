/**
 * @fileoverview SiteConnections enum type
 */

export type LandOwner = "landOwner";
export type PropertyOwner = "propertyOwner";
export type Developer = "developer";
export type Commercial = "commercial";
export type LocalResident = "localResident";
export type CommunityGroup = "communityGroup";
export type Other = "other";

/**
 * @id site_connections
 * @title Site Connections
 * @description What is your connection to the site?
 * @schema
 *
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
 * @id site_connections_main
 * @title Site Connections Main
 * @description What is your connection to the site? (excluding "other")
 * @schema
 *
 * What is your connection to the site? (excluding "other")
 * landOwner: Land owner
 * propertyOwner: Property owner
 * developer: Developer
 * commercial: Commercial or business operator
 * localResident: Local resident
 * communityGroup: Community group
 */
export type SiteConnectionsMain =
  | LandOwner
  | PropertyOwner
  | Developer
  | Commercial
  | LocalResident
  | CommunityGroup;
