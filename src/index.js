import React from "react";
import ReactDOM from "react-dom";
import API_URL from "./config.json";

import "./index.scss";
import "macro-css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
