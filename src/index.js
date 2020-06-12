import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import "./index.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

ReactDOM.render(<App />, document.getElementById("root"));

let date = new Date(2020, 5, 10, 23, 59, 59); // год, месяц, день, час, мин, сек
let result = formatDistanceToNow(date);
console.log(result);
