import React, { useState } from "react";
import React from "react";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SelectMenu from "./components/SelectMenu";

import CountryList from "./components/CountryList";

import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  const [query, setQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode"))
  );

  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}
