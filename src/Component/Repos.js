import React from 'react'

function Repos({repo,id}) {
    return (
      <div className="repo">
        <img src={repo.owner.avatar_url} alt={repo.name} />
        <h4 className="repo-title">{repo.name}</h4>
        <h4 className="repo-detail">{repo.stargazers_count} Stars</h4>
        <h4 className="repo-detail">{repo.forks} Forks</h4>
        <h4 className="repo-detail">{repo.open_issues} Issues</h4>
      </div>
    );
}

export default Repos
