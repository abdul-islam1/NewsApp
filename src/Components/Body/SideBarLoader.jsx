import React from "react";
import noimg from "../Images/noimg.jpeg";

function SideBarLoader({ searchNews }) {
  return (
    <>
      {searchNews.map((article) => (
        <>
          <div className="rounded-xl bg-slate-50 hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-800 hover:transition-all dark:hover:transition-all shadow-lg m-5 border dark:border-slate-600">
            <img
              className="w-full h-36 object-cover rounded-t-xl"
              src={article.urlToImage ? article.urlToImage : noimg}
              alt={article.title}
              onError={(e) => {
                e.target.src = noimg;
              }}
            />
            <ul>
              <li className="p-2 m-2" key={article.title}>
                <a href={article.url} target="_blank">
                  {article.title}
                </a>
              </li>
            </ul>
          </div>
        </>
      ))}
    </>
  );
}

export default SideBarLoader;
