import React from "react";
import axios from "axios";

const topHeadlinesURL = process.env.REACT_APP_NEWS_APP_TOP_HEADLINES_API_URL;

const API_BASE_URL = "https://api.example.com";

export const GetTopHeadLines = async (params) => {
  try {
    const data = localStorage.getItem(
      `response.data_${params.country}_${params.category}_${params.page}`
    );
    if (data) {
      return JSON.parse(data);
    } else {
      const response = await axios.get(topHeadlinesURL, {
        params,
      });
      localStorage.setItem(
        `response.data_${params.country}_${params.category}_${params.page}`,
        JSON.stringify(response.data)
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
};
