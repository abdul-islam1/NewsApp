import React from "react";
import axios from "axios";

const topHeadlinesURL = process.env.REACT_APP_NEWS_APP_TOP_HEADLINES_API_URL;

const GetTopHeadLines = async (params) => {
  console.log(params);
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
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default GetTopHeadLines;
