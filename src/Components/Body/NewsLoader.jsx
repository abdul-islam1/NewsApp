import React, { useState } from "react";
import noimg from "../Images/noimg.jpeg";

function NewsLoader({ news }) {
  return (
    <>
      {news.map((article, index) => {
        return (
          <div className="w-full" key={index}>
            <div
              className="rounded-b-3xl overflow-hidden bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 hover:transition-all dark:hover:transition-all shadow-lg m-5 border dark:border-slate-600"
              style={{ height: "600px" }}
            >
              <img
                className="w-full h-80 object-cover"
                src={article.urlToImage ? article.urlToImage : noimg}
                alt={article.title}
                onError={(e) => {
                  e.target.src = noimg;
                }}
              />
              <div className="px-6 py-4 h-56">
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <p className="text-slate-700 dark:text-slate-300">
                  {article.description}
                </p>
              </div>
              <div className="flex justify-between items-baseline px-6">
                <div className="text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900 px-3 py-1 ">
                  {article.source.name} (
                  {article.publishedAt.substring(
                    0,
                    article.publishedAt.length - 10
                  )}
                  )
                </div>
                <a
                  className="bg-rose-500 hover:bg-rose-600 hover:transition-all text-white font-bold py-2 px-4 rounded"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default NewsLoader;
