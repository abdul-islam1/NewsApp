import React, { useEffect, useState } from "react";

import Title from "./Header/Title";
import Country from "./Header/Country";
import Category from "./Header/Category";
import InfinitySpinner from "./UI/InfinitySpinner";
import { GetTopHeadLines } from "./Services/GetTopHeadLines";
import SearchForArticles from "./Services/SearchForArticles";
import NewsLoader from "./Body/NewsLoader";
import SideBarLoader from "./Body/SideBarLoader";
import Footer from "../Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [searchNews, setSearchNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(true);
  const [searchQuery, setsearchQuery] = useState("bitcoin");
  const [activeLiCategory, setActiveLiCategory] = useState("null");
  const [activeLiCountry, setActiveLiCountry] = useState("null");

  const [category, setCategory] = useState(() => {
    const savedCategory = localStorage.getItem("SelectedCategory");
    if (savedCategory != null) {
      return savedCategory;
    }

    return "general";
  });

  const [country, setCountry] = useState(() => {
    const savedCountry = localStorage.getItem("SelectedCountry");
    if (savedCountry != null) {
      return savedCountry;
    }

    return "us";
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode != null) {
      return savedMode === "true";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NEWS_APP_API_KEY;

    const getTopHeadlinesFromAPI = async () => {
      try {
        setIsLoading(true);
        const params = {
          country,
          category,
          page,
          apiKey,
        };
        const apiData = await GetTopHeadLines(params);

        setNews(apiData.articles);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const searchForArticlesFromAPI = async () => {
      try {
        if (searchQuery) {
          setIsSearchLoading(true);
          const params = {
            q: searchQuery,
            pageSize: 25,
            apiKey,
          };

          const apiData = await SearchForArticles(params);

          setSearchNews(apiData.articles);

          setIsSearchLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTopHeadlinesFromAPI();
    searchForArticlesFromAPI();

    localStorage.setItem("selectedCategory", category);
    localStorage.setItem("selectedCountry", country);

    const body = document.querySelector("body");
    isDarkMode ? body.classList.add("dark") : body.classList.remove("dark");
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [category, country, page, searchQuery, isDarkMode]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.getAttribute("value"));
    setActiveLiCountry(e.target);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.getAttribute("value"));
    setActiveLiCategory(e.target);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center w-full text-slate-900 dark:text-slate-100">
        <Title isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div
          className="w-full flex justify-center"
          value={country}
          onClick={handleCountryChange}
        >
          <ul className="border-b-2 border-rose-600 text-slate-900 dark:text-slate-100 rounded flex flex-row space-x-20 hover:cursor-pointer country">
            <Country
              activeLiCountry={activeLiCountry}
              nthChild={1}
              value="us"
              country="United States"
            />
            <Country
              activeLiCountry={activeLiCountry}
              nthChild={2}
              value="gb"
              country="United Kingdom"
            />
            <Country
              activeLiCountry={activeLiCountry}
              nthChild={3}
              value="ca"
              country="Canada"
            />
            <Country
              activeLiCountry={activeLiCountry}
              nthChild={4}
              value="au"
              country="Australia"
            />
          </ul>
        </div>
        <div
          className="w-full flex justify-center mb-5"
          value={category}
          onClick={handleCategoryChange}
        >
          <ul className="border-b-2 border-rose-600 text-slate-900 dark:text-slate-100 rounded flex flex-row space-x-20 hover:cursor-pointer category">
            <Category
              activeLiCategory={activeLiCategory}
              nthChild={1}
              value="general"
              category="General"
            />
            <Category
              activeLiCategory={activeLiCategory}
              nthChild={2}
              value="business"
              category="Business"
            />
            <Category
              activeLiCategory={activeLiCategory}
              nthChild={3}
              value="entertainment"
              category="Entertainment"
            />
            <Category
              activeLiCategory={activeLiCategory}
              nthChild={4}
              value="health"
              category="Health"
            />

            <Category
              activeLiCategory={activeLiCategory}
              nthChild={5}
              value="science"
              category="Science"
            />
            <Category
              activeLiCategory={activeLiCategory}
              nthChild={6}
              value="sports"
              category="Sports"
            />
            <Category
              activeLiCategory={activeLiCategory}
              nthChild={7}
              value="technology"
              category="Technology"
            />
          </ul>
        </div>

        <div className="w-full flex">
          <div className="w-full grid grid-cols-2">
            {isLoading ? <InfinitySpinner /> : <NewsLoader news={news} />}
          </div>

          {/* Search Will Start here */}
          <div className="w-1/3">
            <div>
              <form onSubmit={handleSearchSubmit}>
                <div className="w-full flex justify-between bg-slate-50 dark:bg-slate-900 border-2 dark:border-slate-600 rounded-xl h-10 mt-5">
                  <input
                    type="text"
                    className="bg-slate-50 dark:bg-slate-900 pl-5 text-rose-600 focus:outline-none rounded-xl"
                    value={searchQuery}
                    placeholder="Search News Articles..."
                    onChange={(e) => setsearchQuery(e.target.value)}
                  />
                </div>
              </form>
              {isSearchLoading ? (
                <InfinitySpinner />
              ) : (
                <SideBarLoader searchNews={searchNews} />
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mb-5">
          <button
            className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-slate-200 py-1 px-4 rounded mt-10 mr-5"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous Page
          </button>

          <button
            className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-slate-200 py-1 px-4 rounded mt-10 mr-5"
            onClick={() => handlePageChange(page + 1)}
          >
            Next Page
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
