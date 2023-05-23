import React from "react";

function Country({ activeLiCountry, nthChild, value, country }) {
  return (
    <>
      <li
        className={`${
          activeLiCountry ===
          document.querySelector(`ul.country li:nth-child(${nthChild})`)
            ? "text-rose-600"
            : "hover:text-rose-600 hover:transition-all"
        }`}
        value={value}
      >
        {country}
      </li>
    </>
  );
}

export default Country;
