import { Navbar } from "./components/NavBar/Navbar";
import { HomePage } from "./pages/HomePage/HomePage";
import { SearchPage } from "./pages/SearchPage/SearchPage";

export function App() {
  return (
    <>
      <Navbar />
      <SearchPage />
    </>
  );
}
