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
  <>
    <Toaster position="bottom-center" richColors style={{marginTop: "25px"}}/>
    <GlobalStyle />
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </>
);
