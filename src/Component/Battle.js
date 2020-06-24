import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function FormComponent({ count, setUrl }) {
  const [user, setUser] = useState("");
  const [person, setPerson] = useState({
    name: "",
    avatar_url: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const gitImg = await Axios.get(`https://api.github.com/users/${user}`);
      const { name, avatar_url, url } = await gitImg.data;
      setPerson({
        name,
        avatar_url,
      });
      setUrl((prev) => [...prev, url]);
      count((prev) => prev + 1);
    } catch (err) {
      if (err && err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert("Enter Valid Name");
      }
    }
  };
  return (
    <>
      <div className="transition">
        {!person.avatar_url ? (
          <form onSubmit={submit} className="form-group">
            <input
              type="text"
              placeholder="Enter github username"
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

  const history = useHistory();

  const getBattle = () => {
    history.push("/result", {
      url,
    });
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
