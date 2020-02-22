export const typeDefs = ["# scalar JSON\ntype AppleGetFullDetailResponse {\n  appleApp: AppleApp\n  error: String\n}\n\ntype Query {\n  AppleGetFullDetail: AppleGetFullDetailResponse!\n  AppleGetSearch(searchWords: String!, language: String!, country: String!, category: String!): AppleGetSearchResponse!\n  GoogleGetFullDetail(appId: String!): GoogleGetFullDetailResponse!\n  GoogleGetSearch(searchWords: String!, language: String!, country: String!, category: String!): GoogleGetSearchResponse!\n}\n\n# scalar JSON\ntype AppleGetSearchResponse {\n  appleApps: [AppleApp]\n  error: String\n}\n\ntype AppleApp {\n  generatedId: Int\n  id: Int\n  appId: String\n  title: String\n  url: String\n  description: String\n  icon: String\n  country: String\n  language: String\n  category: String\n  languages: [String]\n  developer: String\n  score: Float\n  reviews: Int\n  currentVersionReviews: Int\n  screenshots: [String]\n  genres: [String]\n  primaryGenre: String\n  createdAt: String\n  updatedAt: String\n}\n\nscalar JSON\n\ntype GoogleGetFullDetailResponse {\n  googleApp: GoogleApp\n  error: String\n}\n\ntype GoogleGetSearchResponse {\n  googleApp: [GoogleApp]\n  error: String\n}\n\ntype GoogleApp {\n  appId: String\n  title: String\n  url: String\n  description: String\n  summary: String\n  installs: String\n  icon: String\n  country: String\n  language: String\n  category: String\n  score: Float\n  scoreText: String\n  reviews: Int\n  ratings: Int\n  screenshots: [String]\n  genre: String\n  genreId: String\n  comments: [String]\n  createdAt: String\n  updatedAt: String\n}\n\ntype TestGetFullDetailResponse {\n  result: String\n  error: String\n}\n\ntype Mutation {\n  TestGetFullDetail(name: String!): TestGetFullDetailResponse!\n}\n"];
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
  category: string;
}

export interface GoogleGetFullDetailQueryArgs {
  appId: string;
}

export interface GoogleGetSearchQueryArgs {
  searchWords: string;
  language: string;
  country: string;
  category: string;
}

export interface AppleGetFullDetailResponse {
  appleApp: AppleApp | null;
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
  reviews: number | null;
  currentVersionReviews: number | null;
  screenshots: Array<string> | null;
  genres: Array<string> | null;
  primaryGenre: string | null;
  createdAt: string | null;
  updatedAt: string | null;
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

export interface GoogleGetSearchResponse {
  googleApp: Array<GoogleApp> | null;
  error: string | null;
}

export interface Mutation {
  TestGetFullDetail: TestGetFullDetailResponse;
}

export interface TestGetFullDetailMutationArgs {
  name: string;
}

export interface TestGetFullDetailResponse {
  result: string | null;
  error: string | null;
}

export type JSON = any;
