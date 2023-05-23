import React from "react";

function Category({ activeLiCategory, nthChild, value, category }) {
  return (
    <>
      <li
        className={`${
          activeLiCategory ===
          document.querySelector(`ul.category li:nth-child(${nthChild})`)
            ? "text-rose-600"
            : "hover:text-rose-600 hover:transition-all"
        }`}
        value={value}
      >
        {category}
      </li>
    </>
  );
}

export default Category;
