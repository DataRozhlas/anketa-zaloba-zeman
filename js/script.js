import { h, render } from "preact";
import { byeIE } from "./byeie";
/** @jsx h */

byeIE()
let host = "https://data.irozhlas.cz";
if (window.location.hostname === "localhost") {
  host = "http://localhost";
}

function whatCol(val) {
  if (val === "NEVÍM") {
    return "gray";
  } else if (val === "NE") {
    return "red"
  } else if (val === "ANO") {
    return "blue"
  } else if (val === "") {
    return "lgray"
  } else {
    return "lgray"
  }
};

function onLoad(e) {
  const data = JSON.parse(e.target.response);
  render((
    <div id="anketa">
      {data.map(el => (
        <div className="respondent">
          <img className="portret" src={`${host}/anketa-zaloba-zeman/img/${el.f}`} alt={el.jm} />
          <div className={`${whatCol(el.o)}_b bio`}>
            <div className="jmeno">{`${el.j} ${el.p}`}</div>
            <div className="strana">{el.s}</div>
          </div>
          <div className={`${whatCol(el.o)} odpoved`}>{el.o || "bez odpovědi"}</div>
          <div className={`odpoved`}>{el.o1}</div>
        </div>
      ))}
    </div>
  ), document.getElementById("anketa-wrapper"));
}

let r = new XMLHttpRequest()
r.addEventListener("load", onLoad)
r.open("GET", host + "/anketa-zaloba-zeman/data/data.json")
r.send()

