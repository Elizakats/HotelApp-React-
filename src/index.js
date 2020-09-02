import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from "./serviceWorker";
import HotelApp from "./Components/HotelApp";
import dataJSON from "./data.json";
// import DatePicker from "react-bootstrap-date-picker";

const roomtypes = dataJSON[0].roomtypes;
const entries = dataJSON[1].entries;

ReactDOM.render(
  <React.StrictMode>
    <HotelApp roomtypes={roomtypes} entries={entries} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
