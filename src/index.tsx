import * as React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from './auth/providers/AuthContextProvider';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from './utils/components/globalStyledComponent/globalStyledComponent';
import { Toaster } from 'sonner';
import "./i18n";

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // strict mode deactivated because beautiful dnd not works then
  //<React.StrictMode>
  <>
    {/* Sooner declaration */}
    <Toaster position="top-right" richColors style={{marginTop: "25px"}}/>
    {/* global style constant */}
    <GlobalStyle />
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </>
  //</React.StrictMode>
);
