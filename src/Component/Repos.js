import React from "react";
import { ReactComponent as Link } from "../assets/link.svg";

function Repos({ repo, id }) {
  return (
    <div className="repo text-center">
      <img src={repo.owner.avatar_url} alt={repo.name} />
      <h4 className="repo-title">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name} {" "}
        <Link />
        </a>
      </h4>
      <h4 className="repo-detail">{repo.stargazers_count} Stars</h4>
      <h4 className="repo-detail">{repo.forks} Forks</h4>
      <h4 className="repo-detail">{repo.open_issues} Issues</h4>
    </div>
  );
}

export default Repos;
