import styles from "./SearchPage.module.css";
import { useEffect, useState } from "react";
import { useMovieGenres } from "../../hooks/useMovieGenres";
import { useMovieExplorer } from "../../hooks/useMovieExplorer";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { Button } from "../../components/Button/Button";
import type { SortOption } from "../../services/movieService";

export const SearchPage = () => {
  const {
    data: genres,
    isLoading: loadingGenres,
    error: errorGenres,
  } = useMovieGenres();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMovieExplorer(searchQuery, selectedGenreId, sortBy);
  const movies = data?.pages.flatMap((page) => page.results) || [];

  useEffect(() => {
    setSelectedGenreId(null);
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery("");
  }, [selectedGenreId]);

  return (
    <div className={styles.searchPage}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h3>Genres</h3>

        {loadingGenres && <p>Loading genres...</p>}
        {errorGenres && <p>Error loading genres</p>}

        <div className={styles.genreList}>
          <button
            onClick={() => setSelectedGenreId(null)}
            className={
              selectedGenreId === null
                ? styles.selectedGenreBtn
                : styles.genreBtn
            }
          >
            All Genres
          </button>

          {genres?.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenreId(genre.id)}
              className={
                genre.id === selectedGenreId
                  ? styles.selectedGenreBtn
                  : styles.genreBtn
              }
            >
              {genre.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.searchBarContainer}>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={selectedGenreId || ""}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedGenreId(value === "" ? null : Number(value));
              }}
            >
              <option value="">All Genres</option>
              {genres?.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow}>▼</span>
          </div>

          <input
            placeholder="Search for a movie..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.sortContainer}>
          {selectedGenreId && (
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="popularity.desc">Most Popular</option>
                <option value="vote_average.desc">Highest Rated</option>
                <option value="release_date.desc">Newest First</option>
              </select>
              <span className={styles.selectArrow}>▼</span>
            </div>
          )}
        </div>
        <MovieGrid
          movies={movies}
          loading={isLoading}
          error={error?.message || null}
        />
        {hasNextPage && (
          <Button
            label={`${isFetchingNextPage ? "Loading" : "Load more"}`}
            onClick={fetchNextPage}
          />
        )}
      </main>
    </div>
  );
};
