import React from "react";
import "./CountryListShimmer.css";

export default function CountryListShimmer() {
  //   const container = Array.from(
  //     length,
  //     10,
  //     <div className="country-card shimmer-card"></div>
  //   );
  return (
    <div className="countries-container">
      {Array.from({ length: 10 }).map((el, i) => {
        return <div key={i} className="country-card shimmer-card"></div>;
      })}
    </div>
  );
}
