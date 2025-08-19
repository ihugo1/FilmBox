import { getMovieVideos } from "../services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useMovieTrailer = (movieId: number) => {
  return useQuery({
    queryKey: ["movieTrailer", movieId],
    queryFn: async () => {
      let officialTrailer;
      let anyTrailer;

      const data = await getMovieVideos(movieId);

      for(const video of data.results){
        if(video.type === "Trailer" && video.site === "YouTube"){
          if(video.official && !officialTrailer){
            officialTrailer = video;
          }
          if(!anyTrailer){
            anyTrailer = video;
          }
          if(officialTrailer) break;
        }
      }
      
      return officialTrailer || anyTrailer || null;
    }
  })
}
