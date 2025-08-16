// Movie Types
export type Genre = {
  id: number;
  name: string;
}

export type Movie = {
  id: number;
  title: string;
  original_language: string;
  genres: Genre[];
  runtime: number;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
};

// Credits Types
export type CastMember = {
  name: string;
  profile_path?: string | null;
  character: string;
}

export type CrewMember = {
  name: string;
  profile_path?: string | null;
  job: string;
}

// Video Types
export interface MovieVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
}