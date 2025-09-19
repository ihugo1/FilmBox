import { useEffect, useState } from "react";
import styles from "./SearchPage.module.css";
import { useSearchParams } from "react-router-dom";
import { useMovieExplorer, useDebounce, useMovieGenres } from "../../hooks";
import { MovieGrid } from "../../components";
import { AsyncStateHandler } from "../../components";
import type { SortOption } from "../../types";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const genreId = searchParams.get("genre");
  const sortBy = (searchParams.get("sort") as SortOption) || "popularity.desc";

  const initialGenre = query ? null : genreId ? parseInt(genreId) : null;

  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(
    initialGenre
  );
  const [sortOption, setSortOption] = useState<SortOption>(sortBy);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    movies,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMovieExplorer(debouncedSearchTerm, selectedGenre, sortOption);

  const {
    data: genres,
    isLoading: genreLoading,
    error: genreError,
  } = useMovieGenres();

  useEffect(() => {
    if (selectedGenre !== null) {
      setSearchTerm("");
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (searchTerm !== "") {
      setSelectedGenre(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm !== "" || selectedGenre === null) {
      setSortOption("popularity.desc");
    }
  }, [searchTerm, selectedGenre]);

  useEffect(() => {
    document.title = "FilmBox - Search";
  }, []);

  useEffect(() => {
    const params: { query?: string; genre?: string; sort?: SortOption } = {};

    if (debouncedSearchTerm.trim()) {
      params.query = debouncedSearchTerm.trim();
    }
    if (selectedGenre) {
      params.genre = String(selectedGenre);
    }
    if (sortOption && sortOption !== "popularity.desc") {
      params.sort = sortOption;
    }
    setSearchParams(params, { replace: true });
  }, [debouncedSearchTerm, selectedGenre, sortOption, setSearchParams]);

  return (
    <main className={styles.searchPage}>
      <div className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
          className={styles.searchInput}
        />
        <div className={styles.selects}>
          <select
            value={selectedGenre ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedGenre(value ? parseInt(value) : null);
            }}
            className={styles.select}
          >
            <option value="">All genres</option>
            {genres &&
              !genreError &&
              !genreLoading &&
              genres?.length > 0 &&
              genres?.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
          </select>

          {selectedGenre !== null && searchTerm === "" && (
            <select
              value={sortOption ?? "popularity.desc"}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className={styles.select}
            >
              <option value="popularity.desc">Popularity</option>
              <option value="vote_average.desc">Rating</option>
              <option value="release_date.desc">Release Date</option>
            </select>
          )}
        </div>
      </div>

      <AsyncStateHandler isLoading={isLoading} error={error}>
        <MovieGrid
          movies={movies}
          gridTitle="Results"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </AsyncStateHandler>
    </main>
  );
};
