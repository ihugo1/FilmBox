/* Genre */

export type Genre = {
  id: number;
  name: string;
};

/* Movie */
export type Movie = {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  genres: Genre[];
  runtime: number;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type CastMember = {
  name: string;
  profile_path?: string | null;
  character: string;
  id: number;
};

export type CrewMember = {
  name: string;
  profile_path?: string | null;
  job: string;
  id: number;
};

export interface MovieVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
}

export type MovieListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieVideoResponse = {
  id: number;
  results: MovieVideo[];
};

export type CreditResponse = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export type GenresResponse = {
  genres: Genre[];
};

export type PersonCastCredit = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  character: string;
};

export type PersonCrewCredit = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  job: string;
};

export type Person = {
  biography: string;
  birthday: string;
  deathday?: string;
  id: number;
  name: string;
  profile_path: string;
  place_of_birth: string;
};

export type PersonMovieCreditResponse = {
  id: number;
  cast: PersonCastCredit[];
  crew: PersonCrewCredit[];
};

export const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "release_date.desc", label: "Newest First" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
