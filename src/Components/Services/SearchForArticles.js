import axios from "axios";
import React from "react";

const searchNewsURL = process.env.REACT_APP_NEWS_APP_SEACRH_API_URL;

export const SearchForArticles = async (params) => {
  try {
    const data = localStorage.getItem(`response.dataSearch_${params.q}`);
    if (data) {
      return JSON.parse(data);
    } else {
      const response = await axios.get(searchNewsURL, {
        params,
      });
      localStorage.setItem(
        `response.dataSearch_${params.q}`,
        JSON.stringify(response.data)
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
};

export default SearchForArticles;
