import { apiRequest } from "../api/tmdb.client";
import type { PersonMovieCreditResponse } from "../types";
import type { Person } from "../types";

export const getPersonDetails = async (
  personId: number
): Promise<Person> => {
  const personResponse = await apiRequest<Person>(
    `/person/${personId}`
  );
  return personResponse;
}

export const getPersonMovieCredits = async (
  personId: number
): Promise<PersonMovieCreditResponse> => {
  const personMovieCreditResponse = await apiRequest<PersonMovieCreditResponse>(
    `/person/${personId}/movie_credits`
  );
  return personMovieCreditResponse;
};
