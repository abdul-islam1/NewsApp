import React from "react";

function Title({ isDarkMode, setIsDarkMode }) {
  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <>
      <h1 className="text-center text-4xl font-bold m-1 hover:cursor-pointer text-rose-600">
        The News App
      </h1>
      <button className="text-3xl rounded-full font-bold" onClick={handleClick}>
        {isDarkMode ? "🔆" : "🌙"}
      </button>
    </>
  );
}

export default Title;
