import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CountryDetail() {
  //const countryName = new URLSearchParams(location.search).get("name");
  const params = useParams();
  const { state } = useLocation();

  const countryName = params.country;

  const [countryData, setContryData] = useState(null);

  const [notFound, setNotFound] = useState(false);
  function updateCountryData(data) {
    setContryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName)[0].common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      flag: data.flags.svg,

      languages: Object.values(data.languages).join(""),
      currencies: Object.values(data.currencies)
        .map((currency) => currency.name)
        .join(""),
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
          .catch((error) => console.log(error));
      })
    ).then((borders) => {
      setContryData((prevState) => ({ ...prevState, borders }));
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state.data);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })

      .catch((error) => {
        setNotFound(true);
      });
  }, [countryName]);

  //console.log("countryName", countryName.replace(/%20/g, ""));
  if (notFound) {
    return <div>Country Notfound</div>;
  }
  return countryData === null ? (
    "Loading..."
  ) : (
    <div>
      <main>
        <div className="country-details-container">
          <span className="back-button" onClick={() => history.back()}>
            <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
          </span>
          <div className="country-details">
            <img src={countryData.flag} alt={`${countryData.name}flag`} />
            <div className="details-text-container">
              <h1>{countryData.name}</h1>

              <div className="details-text">
                <p>
                  <b>Native Name: {countryData.nativeName}</b>
                  <span className="native-name"></span>
                </p>
                <b>
                  Population: {countryData.population?.toLocaleString("en-IN")}
                </b>
                <p>
                  <b>Region: {countryData.region}</b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryData.subregion}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>Capital: {countryData.capital}</b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {countryData.tld}</b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryData.currencies}</b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b>Languages: {countryData.languages}</b>
                  <span className="languages"></span>
                </p>
              </div>
              {console.log("countryData.borders", countryData.borders)}
              {countryData.borders.length !== 0 && (
                <div className="border-countries">
                  Border Countries:
                  {countryData.borders.map((border) => {
                    console.log("bbbbbbb", border);
                    return (
                      <Link key={border} to={`/${border}`}>
                        {border}
                      </Link>
                    );
                  })}
                  &nbsp;
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
