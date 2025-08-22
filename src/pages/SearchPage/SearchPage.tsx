import styles from "./SearchPage.module.css";
import { useEffect, useState } from "react";
import { useMovieGenres } from "../../hooks/useMovieGenres";
import { useMovieExplorer } from "../../hooks/useMovieExplorer";
import { MovieGrid } from "../../components/MovieGrid/MovieGrid";
import { Button } from "../../components/Button/Button";
import { AsyncStateHandler } from "../../components/AsyncStateHandler/AsyncStateHandler";
import Select from "react-select";
import type { SortOption } from "../../services/movieService";

interface genreSelectOption {
  value: number;
  label: string;
}

export const SearchPage = () => {
  const { data: genres, isLoading: loadingGenres, error: errorGenres, } = useMovieGenres();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<genreSelectOption | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMovieExplorer(searchQuery, selectedGenre?.value ?? null, sortBy);


  const movies = data?.pages.flatMap((page) => page.results) || [];

  const genreSelectOptions: genreSelectOption[] = genres?.map((genre) => ({
    value: genre.id,
    label: genre.name,
  })) || [];

  const sortOptions = [
    { value: "popularity.desc", label: "Popular" },
    { value: "vote_average.desc", label: "Rated" },
    { value: "release_date.desc", label: "Newest" },
  ]

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setSelectedGenre(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedGenre !== null) {
      setSearchQuery("");
      setSortBy("popularity.desc");
    }
  }, [selectedGenre]);

  return (
    <div className={styles.searchPage}>

      <div className={styles.searchContainer}>
        <input
          placeholder="Search for a movie..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.selectContainer}>
        <div className={styles.select}>
          <Select
            options={genreSelectOptions}
            value={selectedGenre}
            onChange={(newValue) => setSelectedGenre(newValue)}
            isLoading={loadingGenres}
            isDisabled={loadingGenres || !!errorGenres}
            className="custom-select"
            classNamePrefix="react-select"
          />
        </div>
        {selectedGenre && (
          <div className={styles.select}>
            <Select
              options={sortOptions}
              value={sortOptions.find((option) => option.value === sortBy)}
              onChange={(newValue) => setSortBy(newValue?.value as SortOption)}
              isLoading={loadingGenres}
              className="custom-select"
              classNamePrefix="react-select"
            />
          </div>
        )}
      </div>

      <AsyncStateHandler isLoading={isLoading} error={error}>
        <MovieGrid movies={movies} gridTitle={searchQuery.length > 2 ? `Results for "${searchQuery}"` : ""} />
        {hasNextPage && (
          <Button
            label={`${isFetchingNextPage ? "Loading" : "Load more"}`}
            onClick={fetchNextPage}
          />
        )}
      </AsyncStateHandler>

    </div>
  );
};
