import * as React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from './auth/providers/AuthContextProvider';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // strict mode deactivated because beautiful dnd not works then
  //<React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
  //</React.StrictMode>
);
