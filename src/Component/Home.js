import React, { useState } from "react";
import useSwr from "swr";
import axios from "axios";
import Repos from "./Repos";

const languages = ["All", "JavaScript", "Java", "Ruby", "Python"];

const url = (lang) =>
  `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`;

function Home() {
  const [lang, setLang] = useState(languages[0]);

  const fetchUrl = (...args) => axios.get(...args).then((res) => res.data);

  const { data, error } = useSwr(url(lang), fetchUrl);

  if (error) {
    return <h1>error occured</h1>;
  }

  if (!data) {
    return <h1>loading ...</h1>;
  }

  return (
    <>
      <ul className="flex">
        {languages.map((lang, ind) => (
          <li onClick={() => setLang(lang)} key={ind}>
            {lang}
          </li>
        ))}
      </ul>

      <div className="grid">
        {data.items.map((repo, index) => (
          <Repos repo={repo} key={index} id={index} />
        ))}
      </div>
    </>
  );
}

export default Home;
