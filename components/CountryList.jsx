import React, { useEffect, useState } from "react";
import countriesData from "../countriesData";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";

export default function CountryList({ query }) {
  const [countriesData, setCountriesData] = useState([]);
  //let countriesData = [];
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
        console.log("countriesData", countriesData);
      });
  }, []);

  //   const filteredCountries = countriesData.filter((country) => {
  //     return country.name.common.includes("India");
  //   });

  //const [query, setQuery] = useState("");
  return (
    <div>
      {!countriesData.length ? (
        <CountryListShimmer />
      ) : (
        <div className="countries-container">
          {countriesData
            .filter((country) => {
              return (
                country.name.common.toLowerCase().includes(query) ||
                country.region.toLowerCase().includes(query)
              );
            })
            .map((country) => {
              return (
                <CountryCard
                  key={country.name.common}
                  name={country.name.common}
                  flag={country.flags.svg}
                  population={country.population}
                  region={country.region}
                  capitial={country.capital?.[0]}
                  data={country}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
