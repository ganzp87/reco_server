export const typeDefs = ["type AppleGetAppResponse {\n  appleApp: [AppleApp]\n  error: String\n}\n\ntype Query {\n  AppleGetApp(language: String!, country: String!, category: String!): AppleGetAppResponse!\n  AppleSaveFullDetail(id: String!): AppleSaveFullDetailResponse!\n  AppleSavePopular(language: String!, country: String!, category: String!): AppleSavePopularResponse!\n  AppleSaveSearch(searchWords: String!, language: String!, country: String!, category: String!): AppleSaveSearchResponse!\n  AppleSaveSearchAll(category: String): AppleSaveSearchAllResponse!\n  AppleSaveTopList(appleCollection: AppleCollections!, appleCategory: AppleCategories!, country: String!, category: String!): AppleSaveTopListResponse!\n  GoogleGetApp(language: String!, country: String!, category: String!): GoogleGetAppResponse!\n  GoogleSaveFullDetail(appId: String!): GoogleSaveFullDetailResponse!\n  GoogleSaveSearch(searchWords: String!, language: String!, country: String!, category: String!): GoogleSaveSearchResponse!\n  GoogleSaveSearchAll(category: String): GoogleSaveSearchAllResponse!\n}\n\n# scalar JSON\ntype AppleSaveFullDetailResponse {\n  appleApp: AppleApp\n  error: String\n}\n\n# scalar JSON\ntype AppleSavePopularResponse {\n  appleApps: [AppleApp]\n  error: String\n}\n\n# scalar JSON\ntype AppleSaveSearchResponse {\n  appleApps: [AppleApp]\n  error: String\n}\n\n# scalar JSON\ntype AppleSaveSearchAllResponse {\n  appleApps: [AppleApp]\n  error: String\n}\n\n# scalar JSON\ntype AppleSaveTopListResponse {\n  appleApps: [AppleApp]\n  error: String\n}\n\ntype AppleApp {\n  generatedId: Int\n  id: Int\n  appId: String\n  title: String\n  url: String\n  description: String\n  icon: String\n  country: String\n  language: String\n  category: String\n  languages: [String]\n  developer: String\n  score: Float\n  ratings: Int\n  contentRating: String\n  reviews: Int\n  currentVersionReviews: Int\n  screenshots: [String]\n  genres: [String]\n  primaryGenre: String\n  createdAt: String\n  updatedAt: String\n}\n\nenum AppleCategories {\n  BOOKS\n  BUSINESS\n  CATALOGS\n  EDUCATION\n  ENTERTAINMENT\n  FINANCE\n  FOOD_AND_DRINK\n  GAMES\n  GAMES_ACTION\n  GAMES_ADVENTURE\n  GAMES_ARCADE\n  GAMES_BOARD\n  GAMES_CARD\n  GAMES_CASINO\n  GAMES_DICE\n  GAMES_EDUCATIONAL\n  GAMES_FAMILY\n  GAMES_MUSIC\n  GAMES_PUZZLE\n  GAMES_RACING\n  GAMES_ROLE_PLAYING\n  GAMES_SIMULATION\n  GAMES_SPORTS\n  GAMES_STRATEGY\n  GAMES_TRIVIA\n  GAMES_WORD\n  HEALTH_AND_FITNESS\n  LIFESTYLE\n  MAGAZINES_AND_NEWSPAPERS\n  MAGAZINES_ARTS\n  MAGAZINES_AUTOMOTIVE\n  MAGAZINES_WEDDINGS\n  MAGAZINES_BUSINESS\n  MAGAZINES_CHILDREN\n  MAGAZINES_COMPUTER\n  MAGAZINES_FOOD\n  MAGAZINES_CRAFTS\n  MAGAZINES_ELECTRONICS\n  MAGAZINES_ENTERTAINMENT\n  MAGAZINES_FASHION\n  MAGAZINES_HEALTH\n  MAGAZINES_HISTORY\n  MAGAZINES_HOME\n  MAGAZINES_LITERARY\n  MAGAZINES_MEN\n  MAGAZINES_MOVIES_AND_MUSIC\n  MAGAZINES_POLITICS\n  MAGAZINES_OUTDOORS\n  MAGAZINES_FAMILY\n  MAGAZINES_PETS\n  MAGAZINES_PROFESSIONAL\n  MAGAZINES_REGIONAL\n  MAGAZINES_SCIENCE\n  MAGAZINES_SPORTS\n  MAGAZINES_TEENS\n  MAGAZINES_TRAVEL\n  MAGAZINES_WOMEN\n  MEDICAL\n  MUSIC\n  NAVIGATION\n  NEWS\n  PHOTO_AND_VIDEO\n  PRODUCTIVITY\n  REFERENCE\n  SHOPPING\n  SOCIAL_NETWORKING\n  SPORTS\n  TRAVEL\n  UTILITIES\n  WEATHER\n}\n\nenum AppleCollections {\n  TOP_MAC\n  TOP_FREE_MAC\n  TOP_GROSSING_MAC\n  TOP_PAID_MAC\n  NEW_IOS\n  NEW_FREE_IOS\n  NEW_PAID_IOS\n  TOP_FREE_IOS\n  TOP_FREE_IPAD\n  TOP_GROSSING_IOS\n  TOP_GROSSING_IPAD\n  TOP_PAID_IOS\n  TOP_PAID_IPAD\n}\n\ntype GoogleGetAppResponse {\n  googleApp: [GoogleApp]\n  error: String\n}\n\nscalar JSON\n\ntype GoogleSaveFullDetailResponse {\n  googleApp: GoogleApp\n  error: String\n}\n\ntype GoogleSaveSearchResponse {\n  googleApp: [GoogleApp]\n  error: String\n}\n\ntype GoogleSaveSearchAllResponse {\n  googleApp: [GoogleApp]\n  error: String\n}\n\ntype GoogleApp {\n  appId: String\n  title: String\n  url: String\n  description: String\n  summary: String\n  installs: String\n  icon: String\n  country: String\n  language: String\n  category: String\n  score: Float\n  scoreText: String\n  reviews: Int\n  ratings: Int\n  screenshots: [String]\n  genre: String\n  genreId: String\n  comments: [String]\n  createdAt: String\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  AppleGetApp: AppleGetAppResponse;
  AppleSaveFullDetail: AppleSaveFullDetailResponse;
  AppleSavePopular: AppleSavePopularResponse;
  AppleSaveSearch: AppleSaveSearchResponse;
  AppleSaveSearchAll: AppleSaveSearchAllResponse;
  AppleSaveTopList: AppleSaveTopListResponse;
  GoogleGetApp: GoogleGetAppResponse;
  GoogleSaveFullDetail: GoogleSaveFullDetailResponse;
  GoogleSaveSearch: GoogleSaveSearchResponse;
  GoogleSaveSearchAll: GoogleSaveSearchAllResponse;
}

export interface AppleGetAppQueryArgs {
  language: string;
  country: string;
  category: string;
}

export interface AppleSaveFullDetailQueryArgs {
  id: string;
}

export interface AppleSavePopularQueryArgs {
  language: string;
  country: string;
  category: string;
}

export interface AppleSaveSearchQueryArgs {
  searchWords: string;
  language: string;
  country: string;
  category: string;
}

export interface AppleSaveSearchAllQueryArgs {
  category: string | null;
}

export interface AppleSaveTopListQueryArgs {
  appleCollection: AppleCollections;
  appleCategory: AppleCategories;
  country: string;
  category: string;
}

export interface GoogleGetAppQueryArgs {
  language: string;
  country: string;
  category: string;
}

export interface GoogleSaveFullDetailQueryArgs {
  appId: string;
}

export interface GoogleSaveSearchQueryArgs {
  searchWords: string;
  language: string;
  country: string;
  category: string;
}

export interface GoogleSaveSearchAllQueryArgs {
  category: string | null;
}

export interface AppleGetAppResponse {
  appleApp: Array<AppleApp> | null;
  error: string | null;
}

export interface AppleApp {
  generatedId: number | null;
  id: number | null;
  appId: string | null;
  title: string | null;
  url: string | null;
  description: string | null;
  icon: string | null;
  country: string | null;
  language: string | null;
  category: string | null;
  languages: Array<string> | null;
  developer: string | null;
  score: number | null;
  ratings: number | null;
  contentRating: string | null;
  reviews: number | null;
  currentVersionReviews: number | null;
  screenshots: Array<string> | null;
  genres: Array<string> | null;
  primaryGenre: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AppleSaveFullDetailResponse {
  appleApp: AppleApp | null;
  error: string | null;
}

export interface AppleSavePopularResponse {
  appleApps: Array<AppleApp> | null;
  error: string | null;
}

export interface AppleSaveSearchResponse {
  appleApps: Array<AppleApp> | null;
  error: string | null;
}

export interface AppleSaveSearchAllResponse {
  appleApps: Array<AppleApp> | null;
  error: string | null;
}

export type AppleCollections = "TOP_MAC" | "TOP_FREE_MAC" | "TOP_GROSSING_MAC" | "TOP_PAID_MAC" | "NEW_IOS" | "NEW_FREE_IOS" | "NEW_PAID_IOS" | "TOP_FREE_IOS" | "TOP_FREE_IPAD" | "TOP_GROSSING_IOS" | "TOP_GROSSING_IPAD" | "TOP_PAID_IOS" | "TOP_PAID_IPAD";

export type AppleCategories = "BOOKS" | "BUSINESS" | "CATALOGS" | "EDUCATION" | "ENTERTAINMENT" | "FINANCE" | "FOOD_AND_DRINK" | "GAMES" | "GAMES_ACTION" | "GAMES_ADVENTURE" | "GAMES_ARCADE" | "GAMES_BOARD" | "GAMES_CARD" | "GAMES_CASINO" | "GAMES_DICE" | "GAMES_EDUCATIONAL" | "GAMES_FAMILY" | "GAMES_MUSIC" | "GAMES_PUZZLE" | "GAMES_RACING" | "GAMES_ROLE_PLAYING" | "GAMES_SIMULATION" | "GAMES_SPORTS" | "GAMES_STRATEGY" | "GAMES_TRIVIA" | "GAMES_WORD" | "HEALTH_AND_FITNESS" | "LIFESTYLE" | "MAGAZINES_AND_NEWSPAPERS" | "MAGAZINES_ARTS" | "MAGAZINES_AUTOMOTIVE" | "MAGAZINES_WEDDINGS" | "MAGAZINES_BUSINESS" | "MAGAZINES_CHILDREN" | "MAGAZINES_COMPUTER" | "MAGAZINES_FOOD" | "MAGAZINES_CRAFTS" | "MAGAZINES_ELECTRONICS" | "MAGAZINES_ENTERTAINMENT" | "MAGAZINES_FASHION" | "MAGAZINES_HEALTH" | "MAGAZINES_HISTORY" | "MAGAZINES_HOME" | "MAGAZINES_LITERARY" | "MAGAZINES_MEN" | "MAGAZINES_MOVIES_AND_MUSIC" | "MAGAZINES_POLITICS" | "MAGAZINES_OUTDOORS" | "MAGAZINES_FAMILY" | "MAGAZINES_PETS" | "MAGAZINES_PROFESSIONAL" | "MAGAZINES_REGIONAL" | "MAGAZINES_SCIENCE" | "MAGAZINES_SPORTS" | "MAGAZINES_TEENS" | "MAGAZINES_TRAVEL" | "MAGAZINES_WOMEN" | "MEDICAL" | "MUSIC" | "NAVIGATION" | "NEWS" | "PHOTO_AND_VIDEO" | "PRODUCTIVITY" | "REFERENCE" | "SHOPPING" | "SOCIAL_NETWORKING" | "SPORTS" | "TRAVEL" | "UTILITIES" | "WEATHER";

export interface AppleSaveTopListResponse {
  appleApps: Array<AppleApp> | null;
  error: string | null;
}

export interface GoogleGetAppResponse {
  googleApp: Array<GoogleApp> | null;
  error: string | null;
}

export interface GoogleApp {
  appId: string | null;
  title: string | null;
  url: string | null;
  description: string | null;
  summary: string | null;
  installs: string | null;
  icon: string | null;
  country: string | null;
  language: string | null;
  category: string | null;
  score: number | null;
  scoreText: string | null;
  reviews: number | null;
  ratings: number | null;
  screenshots: Array<string> | null;
  genre: string | null;
  genreId: string | null;
  comments: Array<string> | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GoogleSaveFullDetailResponse {
  googleApp: GoogleApp | null;
  error: string | null;
}

export interface GoogleSaveSearchResponse {
  googleApp: Array<GoogleApp> | null;
  error: string | null;
}

export interface GoogleSaveSearchAllResponse {
  googleApp: Array<GoogleApp> | null;
  error: string | null;
}

export type JSON = any;
