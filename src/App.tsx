import { Toaster } from "react-hot-toast";
import { Routes, Route, useParams, HashRouter } from "react-router-dom";
import { Navbar, Footer, ScrollToTop } from "./components";
import {
  HomePage,
  SearchPage,
  MovieDetailPage,
  MovieListsPage,
  PersonPage,
} from "./pages";
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
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailWrapper />} />
          <Route path="/lists" element={<MovieListsPage />} />
          <Route path="/person/:id" element={<PersonPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </MovieListsProvider>
  );
}
