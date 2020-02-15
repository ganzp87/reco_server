export const typeDefs = ["# scalar JSON\ntype AppleGetFullDetailResponse {\n  appleApp: AppleApp\n  error: String\n}\n\ntype Query {\n  AppleGetFullDetail: AppleGetFullDetailResponse!\n  AppleGetSearch(searchWords: String!, language: String!, country: String!): AppleGetSearchResponse!\n  GoogleGetFullDetail(appId: String!): GoogleGetFullDetailResponse!\n  GoogleGetSearch(searchWords: String!, language: String!, country: String!): GoogleGetSearchResponse!\n}\n\n# scalar JSON\ntype AppleGetSearchResponse {\n  appleApps: [AppleApp]\n  error: String\n}\n\ntype AppleApp {\n  id: Int\n  appId: String\n  title: String\n  url: String\n  description: String\n  icon: String\n  languages: [String]\n  released: String\n  updated: String\n  releaseNotes: String\n  developer: String\n  developerUrl: String\n  developerWebsite: String\n  score: Float\n  reviews: Int\n  currentVersionReviews: Int\n  screenshots: [String]\n  genres: [String]\n}\n\nscalar JSON\n\ntype GoogleGetFullDetailResponse {\n  googleApp: GoogleApp\n  error: String\n}\n\ntype GoogleGetSearchResponse {\n  googleApp: [GoogleApp]\n  error: String\n}\n\ntype GoogleApp {\n  appId: String\n  title: String\n  url: String\n  description: String\n  descriptionHTML: String\n  summary: String\n  installs: String\n  minInstalls: Int\n  icon: String\n  languages: [String]\n  released: String\n  updated: String\n  releaseNotes: String\n  developer: String\n  developerUrl: String\n  developerWebsite: String\n  srore: Float\n  scoreText: String\n  reviews: Int\n  ratings: Int\n  currentVersionReviews: Int\n  screenshots: [String]\n  genre: String\n  genreId: Int\n  familyGenre: String\n  familyGenreId: Int\n}\n"];
/* tslint:disable */

export interface Query {
  AppleGetFullDetail: AppleGetFullDetailResponse;
  AppleGetSearch: AppleGetSearchResponse;
  GoogleGetFullDetail: GoogleGetFullDetailResponse;
  GoogleGetSearch: GoogleGetSearchResponse;
}

export interface AppleGetSearchQueryArgs {
  searchWords: string;
  language: string;
  country: string;
}

export interface GoogleGetFullDetailQueryArgs {
  appId: string;
}

export interface GoogleGetSearchQueryArgs {
  searchWords: string;
  language: string;
  country: string;
}

export interface AppleGetFullDetailResponse {
  appleApp: AppleApp | null;
  error: string | null;
}

export interface AppleApp {
  id: number | null;
  appId: string | null;
  title: string | null;
  url: string | null;
  description: string | null;
  icon: string | null;
  languages: Array<string> | null;
  released: string | null;
  updated: string | null;
  releaseNotes: string | null;
  developer: string | null;
  developerUrl: string | null;
  developerWebsite: string | null;
  score: number | null;
  reviews: number | null;
  currentVersionReviews: number | null;
  screenshots: Array<string> | null;
  genres: Array<string> | null;
}

export interface AppleGetSearchResponse {
  appleApps: Array<AppleApp> | null;
  error: string | null;
}

export interface GoogleGetFullDetailResponse {
  googleApp: GoogleApp | null;
  error: string | null;
}

export interface GoogleApp {
  appId: string | null;
  title: string | null;
  url: string | null;
  description: string | null;
  descriptionHTML: string | null;
  summary: string | null;
  installs: string | null;
  minInstalls: number | null;
  icon: string | null;
  languages: Array<string> | null;
  released: string | null;
  updated: string | null;
  releaseNotes: string | null;
  developer: string | null;
  developerUrl: string | null;
  developerWebsite: string | null;
  srore: number | null;
  scoreText: string | null;
  reviews: number | null;
  ratings: number | null;
  currentVersionReviews: number | null;
  screenshots: Array<string> | null;
  genre: string | null;
  genreId: number | null;
  familyGenre: string | null;
  familyGenreId: number | null;
}

export interface GoogleGetSearchResponse {
  googleApp: Array<GoogleApp> | null;
  error: string | null;
}

export type JSON = any;
