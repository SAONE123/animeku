import { useEffect, useState } from "react";
import MainContent from "./main-content";
import { Global } from "./mainComponent/global";
import React from "react";

const Left = () => {
  const [useApi, setuseApi] = useState([]);
  useEffect(() => {
    fetch(Global.genreUrl)
      .then((req) => req.json())
      .then(({ data }) => {
        setuseApi(data);
      });
  }, []);
  console.log(useApi);
  const [datas, setdatas] = useState([]);
  function doFilter(event) {
    var boxes = document.getElementsByClassName("genrebox");
    var genSelected = [];
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        genSelected.push(boxes[i].dataset.genreid);
      }
    }
    genSelected = genSelected.join(",");
    Global.contentUrl = "https://api.jikan.moe/v4/anime?genres=" + genSelected;
    Global.loaded = false;
    setdatas(Math.random());
  }
  var handleKeyDown = function (e) {
    if (e.key === "Enter") {
      Global.contentUrl = "https://api.jikan.moe/v4/anime?q=" + e.target.value;
      Global.loaded = false;
      setdatas(Math.random());
    }
  };
  return (
    <>
      <div className="container-navbar">
        <div className="logo">
          Anime<span>In</span>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search Here"
            onKeyDown={handleKeyDown}
          />
        </div>
        <nav>
          <ul className="navbar-content">
            <li>
              <a href="#">
                <img
                  className="icon-img"
                  src={require("./asset/login.png")}
                  alt=""
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="left-container">
        <h1>GENRE</h1>
        <div className="filter-box">
          {useApi.map((data, i) => {
            return (
              <label htmlFor={"genre-" + i} key={i}>
                <input
                  id={"genre-" + i}
                  className="genrebox"
                  type="checkbox"
                  data-genreid={data.mal_id}
                  onChange={doFilter}
                />
                <p>{data.name}</p>
              </label>
            );
          })}
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default Left;
