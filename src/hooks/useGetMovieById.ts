import { useQuery } from '@tanstack/react-query'
import { getMovieById } from "../services/movieService"

export const useGetMovieById = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: 
      async () => {
        const data = await getMovieById(movieId)
        return data;
      }
  })
}