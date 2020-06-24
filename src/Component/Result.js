import React, { useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import useSwr from "swr";
import axios from "axios";
import { useState } from "react";

function ResultCard({ user }) {
  return (
    <div className="repo m-2 text-center">
      <h1 className="br-title">{user.winner ? "Winner" : "Loser"}</h1>
      <img src={user.avatar_url} alt={user.name} />
      <h4 className="repo-detail my-3 c-pink">Score {user.score} </h4>
      <h4 className="repo-detail">{user.followers} Followers</h4>
      <h4 className="repo-detail">{user.following} Following</h4>
      <h4 className="repo-detail">{user.public_repos} Public Repo</h4>
    </div>
  );
}

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

function Result() {
  const { state } = useLocation();
  const history = useHistory();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (state && state.url) {
      if (state.url.length !== 2) history.push("/battle");
      else setMounted(true);
    } else {
      history.push("/battle");
    }
  }, [state, history]);

  const { data: user1, error: u1Error } = useSwr(
    mounted && state.url[0],
    fetcher
  );
  const { data: user2, error: u2Error } = useSwr(
    mounted && state.url[1],
    fetcher
  );

  if (u1Error || u2Error) {
    alert("Error occured");
    return <Redirect to="/battle" exact />;
  }

  if (!user1 || !user2) {
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

  const score1 = Math.floor(
    (user1.public_repos + user1.followers) * 2 - user1.following * 0.7
  );
  const score2 = Math.floor(
    (user2.public_repos + user2.followers) * 2 - user2.following * 0.7
  );

  if (score1 > score2) {
    user1.winner = true;
    user1.score = score1;
    user2.winner = false;
    user2.score = score2;
  } else {
    user2.winner = true;
    user1.score = score1;
    user1.winner = false;
    user2.score = score2;
  }

  return (
    <>
      <div className="flex-2">
        <ResultCard user={user1} />
        <ResultCard user={user2} />
      </div>
      <div className="text-center">
        <button
          className="button btn-violet"
          onClick={() => history.replace("/battle")}
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default Result;
