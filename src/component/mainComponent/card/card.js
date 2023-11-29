import { useEffect, useState } from "react";
import { Global } from "../global";

const Card = () => {
  const [Data1, setData1] = useState([]);
  useEffect(() => {
    fetch(Global.contentUrl)
      .then((response) => response.json())
      .then(({ data }) => setData1(data));
  });
  var tempEl = null;
  function hover() {
    function opacity() {
      this.getElementsByClassName("image")[0].style.opacity = "0.2";
      if (tempEl !== null) {
        tempEl.getElementsByClassName("image")[0].style.opacity = "";
      }
      tempEl = this;
    }
    var cardbox = document.getElementsByClassName("card-box");
    for (let i = 0; i < cardbox.length; i++) {
      cardbox[i].addEventListener("click", opacity);
    }
  }
  return (
    <>
      {Data1.map((data, i) => {
        return (
          <div className="card-box" key={i} onClick={hover}>
            <div className="text-content">
              <h1>{data.title}</h1>
              <p>{data.synopsis}</p>
            </div>
            <img src={data.images.jpg.image_url} alt="err" className="image" />
          </div>
        );
      })}
    </>
  );
};
export default Card;
