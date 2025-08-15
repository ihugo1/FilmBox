import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar/Navbar";
import { HomePage } from "./pages/HomePage/HomePage";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { MovieDetailPage } from "./pages/MovieDetailPage/MovieDetailPage";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
