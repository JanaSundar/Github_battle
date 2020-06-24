import React, { useState } from "react";
import useSwr from "swr";
import axios from "axios";
import Repos from "./Repos";

const languages = ["All", "JavaScript", "Java", "Ruby", "Python"];

const url = (lang) =>
  `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`;

function Repo({ lang }) {
  const fetchUrl = (...args) => axios.get(...args).then((res) => res.data);

  const { data, error } = useSwr(url(lang), fetchUrl);

  if (error) {
    return <h1 className="text-center">Error occured</h1>;
  }

  if (!data) {
    return (
      <div className="text-center">
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid">
        {data.items.map((repo, index) => (
          <Repos repo={repo} key={index} id={index} />
        ))}
      </div>
    </>
  );
}

function Home() {
  const [lang, setLang] = useState(languages[0]);
  return (
    <>
      <ul className="flex">
        {languages.map((lng, ind) => (
          <li
            onClick={() => setLang(lng)}
            key={ind}
            className={`lang ${lang === lng ? "active" : ""}`}
          >
            {lng}
          </li>
        ))}
      </ul>

      <Repo lang={lang} />
    </>
  );
}

export default Home;
