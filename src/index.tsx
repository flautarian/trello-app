import * as React from "react";
import ReactDOM, { render } from "react-dom";

import App from "./App";
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // strict mode deactivated because beautiful dnd not works then
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
