import { useQuery } from '@tanstack/react-query'
import { getMovieById } from "../../services/movie.service"

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