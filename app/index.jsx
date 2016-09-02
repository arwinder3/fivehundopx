import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

// Got this from: http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
const browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

ReactDOM.render(<App browserWidth={browserWidth} />, document.getElementById("app"));
