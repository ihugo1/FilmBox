import styles from "./SearchPage.module.css";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const { movies, loading, hasMore, loadMore } = useSearchMovies(searchQuery);

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  return (
    <div className={styles.searchPage}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {searchQuery.length < 2 && movies.length === 0 && (
        <div className={styles.emptyState}>
          <h2>🎬 Search for Movies</h2>
          <p>Start typing to discover amazing movies...</p>
        </div>
      )}

      {searchQuery.length >= 2 && movies.length === 0 && !loading && (
        <div className={styles.noResults}>
          <h2>😔 No movies found</h2>
          <p>Try searching for "{searchQuery}" with different keywords</p>
        </div>
      )}

      {loading &&(
        <div className={styles.loading}>
          <p>Looking for results..</p>
        </div>
      )}

      {searchQuery.length >= 1 && (
        <MovieGrid movies={movies} loading={loading} />
      )}

      {hasMore && (
        <button className={styles.loadMoreButton} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
};
