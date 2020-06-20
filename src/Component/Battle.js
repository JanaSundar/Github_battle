import React, { useState } from "react";
import Axios from "axios";

function FormComponent({ count, setUrl }) {
  const [user, setUser] = useState("");
  const [person, setPerson] = useState({
    name: "",
    avatar_url: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    const gitImg = await Axios.get(`https://api.github.com/users/${user}`);
    const { name, avatar_url, url } = await gitImg.data;
    setPerson({
      name,
      avatar_url,
    });
    setUrl((prev) => [...prev, url]);
    count((prev) => prev + 1);
  };
  return (
    <>
      <div className="transition">
        {!person.avatar_url ? (
          <form onSubmit={submit} className="form-group">
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        ) : (
          <div className="card">
            <img src={person.avatar_url} alt="" />
            <h3>{person.name}</h3>
          </div>
        )}
      </div>
    </>
  );
}

function Battle() {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState([]);

  const getBattle = () => {
    console.log(url);
  };

  return (
    <>
      <h2 className="text-center m-2">Players Battle</h2>
      <div className="battle">
        <FormComponent count={setCount} setUrl={setUrl} />
        <FormComponent count={setCount} setUrl={setUrl} />
      </div>
      {count === 2 && (
        <div className="text-center ">
          <button className="button btn-violet" onClick={getBattle}>
            Battle
          </button>
        </div>
      )}
    </>
  );
}

export default Battle;
