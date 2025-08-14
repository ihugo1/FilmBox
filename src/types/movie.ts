export type Genre = {
  id: number;
  name: string;
}

export type Movie = {
  id: number;
  title: string;
  original_language: string;
  genres: Genre[];
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
};

