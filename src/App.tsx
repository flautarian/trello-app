import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import Auth from "./auth/pages/Auth";
import React from 'react';
import Trello from "./trello/Trello";
import { TrelloContextProvider } from './trello/providers/TrelloContextProvider/TrelloContextProvider';
import authCtx from "./auth/providers/AuthContextProvider";

function App() {
  const { authState } = useContext(authCtx);

  return (
    <>
      <Routes>
        {!authState.isLoggedIn && (
          <Route path="user">
            <Route path="*" element={<Navigate to="/user/login" />} />
            <Route path="login" element={<Auth />} />
          </Route>
        )}
        {authState.isLoggedIn && (
          <Route path="boards" element={
            <>
              <div id="modal-root" style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                pointerEvents: "none",
                zIndex: "9",
              }}></div>
              <TrelloContextProvider> 
                <Trello />
              </TrelloContextProvider>
            </>
          } />
        )} 
        <Route path="*" element={<Navigate to={authState.isLoggedIn ? "/boards" : "/user/login"} />} />
      </Routes>
    </>
  );
}

export default App;