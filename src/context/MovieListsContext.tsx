import toast from "react-hot-toast";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type MovieListsContextType = {
  favoriteIds: number[];
  watchLaterIds: number[];

  addToFavorite: (id: number) => void;
  addToWatchLater: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  removeFromWatchLater: (id: number) => void;

  isInFavorite: (id: number) => boolean;
  isInWatchLater: (id: number) => boolean;
};

export const MovieListsContext = createContext<MovieListsContextType>(
  {} as MovieListsContextType
);

export const useMovieLists = () => {
  const context = useContext(MovieListsContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const MovieListsProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteMovies");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error loading favorite movies:", error);
      return [];
    }
  });
  const [watchLaterMoviesIds, setWatchLaterMoviesIds] = useState<number[]>(
    () => {
      try {
        const storedWatchLater = localStorage.getItem("watchLaterMovies");
        return storedWatchLater ? JSON.parse(storedWatchLater) : [];
      } catch (error) {
        console.error("Error loading watch later movies:", error);
        return [];
      }
    }
  );

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteMovies");
      const storedWatchLater = localStorage.getItem("watchLaterMovies");
      if (storedFavorites) setFavoriteMoviesIds(JSON.parse(storedFavorites));
      if (storedWatchLater)
        setWatchLaterMoviesIds(JSON.parse(storedWatchLater));
    } catch (error) {
      console.error("Error loading movies:", error);
    }
  }, []);

  useEffect(() => {
    console.log(favoriteMoviesIds);
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMoviesIds));
  }, [favoriteMoviesIds]);

  useEffect(() => {
    console.log(watchLaterMoviesIds);
    localStorage.setItem(
      "watchLaterMovies",
      JSON.stringify(watchLaterMoviesIds)
    );
  }, [watchLaterMoviesIds]);

  const addToFavorite = (id: number) => {
    if (favoriteMoviesIds.includes(id)) {
      toast("Already in favorites");
      return;
    }
    setFavoriteMoviesIds((prev) => [...prev, id]);
    toast.success("Added to favorites");
  };

  const addToWatchLater = (id: number) => {
    if (watchLaterMoviesIds.includes(id)) {
      toast("Already in watch later list");
      return;
    }
    setWatchLaterMoviesIds((prev) => [...prev, id]);
    toast.success("Added to watch later list");
  };

  const removeFromFavorite = (id: number) => {
    setFavoriteMoviesIds((prev) => prev.filter((movieId) => movieId !== id));
    toast.error("Removed from favorites");
  };

  const removeFromWatchLater = (id: number) => {
    setWatchLaterMoviesIds((prev) => prev.filter((movieId) => movieId !== id));
    toast.error("Removed from watch later list");
  };

  const isInFavorite = (id: number) => {
    return favoriteMoviesIds.includes(id);
  };

  const isInWatchLater = (id: number) => {
    return watchLaterMoviesIds.includes(id);
  };

  const value = {
    favoriteIds: favoriteMoviesIds,
    watchLaterIds: watchLaterMoviesIds,

    addToFavorite,
    addToWatchLater,
    removeFromFavorite,
    removeFromWatchLater,

    isInFavorite,
    isInWatchLater,
  };

  return (
    <MovieListsContext.Provider value={value}>
      {children}
    </MovieListsContext.Provider>
  );
};
