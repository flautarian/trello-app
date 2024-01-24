import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import Auth from "./auth/pages/Auth";
import React from 'react';
import Trello from "./trello/Trello";
import { TrelloContextProvider } from './trello/providers/TrelloContextProvider';
import authCtx from "./auth/providers/AuthContextProvider";

function App() {
  const { authState } = useContext(authCtx);

  return (
    <>
      <Routes>
        {!authState.isLoggedIn && (
          <Route path="user">
            <Route path="*" element={<Navigate to="/user/login" />} />
            <Route path="register" element={<Auth />} />
            <Route path="login" element={<Auth />} />
          </Route>
        )}
        {authState.isLoggedIn && (
          <Route path="boards" element={
            <TrelloContextProvider>
              <Trello />
            </TrelloContextProvider>
          } />
        )}
        <Route path="*" element={<Navigate to={authState.isLoggedIn ? "/boards" : "/user/login"} />} />
      </Routes>
    </>
  );
}

export default App;