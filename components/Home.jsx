import { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountryList";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isDarkMode] = useContext(ThemeContext);
  return (
    <main className={`${isDarkMode ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      {query === "unmount" ? "" : <CountriesList query={query} />}
    </main>
  );
}
