import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthContext from "./auth/AuthContextProvider";
import { useContext } from "react";
import Auth from "./auth/pages/Auth";
import React from 'react';
import Trello from "./trello/Trello";

function App() {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div>
      <Routes>
        {!authState.isLoggedIn && (
          <Route path="user">
            <Route path="*" element={<Navigate to="/user/login" />} />
            <Route path="register" element={<Auth />} />
            <Route path="login" element={<Auth />} />
          </Route>
        )}
        {authState.isLoggedIn && (
          <Route path="boards" element={<Trello />} />
        )}
        <Route path="*" element={<Navigate to={authState.isLoggedIn ? "/boards" : "/user/login"} />} />
      </Routes>
    </div>
  );
}

export default App;