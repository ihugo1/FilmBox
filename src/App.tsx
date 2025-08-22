import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { Navbar } from "./components/NavBar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { HomePage } from "./pages/HomePage/HomePage";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { MovieDetailPage } from "./pages/MovieDetailPage/MovieDetailPage";
import { MovieListsPage } from "./pages/MovieListsPage/MovieListsPage";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { MovieListsProvider } from "./context/MovieListsContext";

const MovieDetailWrapper = () => {
  const { id } = useParams();
  return <MovieDetailPage key={id} />;
};

export function App() {
  return (
    <MovieListsProvider>
      <BrowserRouter basename="/FilmBox">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailWrapper />} />
          <Route path="/lists" element={<MovieListsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MovieListsProvider>
  );
}
