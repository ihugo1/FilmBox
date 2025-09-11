import { Routes, Route, useParams, HashRouter } from "react-router-dom";
import { Navbar, Footer, ScrollToTop } from "./components";
import { HomePage, SearchPage, MovieDetailPage, MovieListsPage } from "./pages";
import { MovieListsProvider } from "./context/MovieListsContext";

const MovieDetailWrapper = () => {
  const { id } = useParams();
  return <MovieDetailPage key={id} />;
};

export function App() {
  return (
    <MovieListsProvider>
      <HashRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailWrapper />} />
          <Route path="/lists" element={<MovieListsPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </MovieListsProvider>
  );
}
