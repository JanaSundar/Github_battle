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
    return <h1>error occured</h1>;
  }

  if (!data) {
    return <h1 className="text-center">loading ...</h1>;
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
        {languages.map((lang, ind) => (
          <li onClick={() => setLang(lang)} key={ind}>
            {lang}
          </li>
        ))}
      </ul>

      <Repo lang={lang} />
    </>
  );
}

export default Home;
