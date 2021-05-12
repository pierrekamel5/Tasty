import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainNavigation from "./configurations/MainNavigation";
import { AuthContext } from "./configurations/auth-context";
import Footer from "./Components/Footer";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store/store";
import PubSub from "pubsub-js";
import { adminRoutes, userRoutes, anonymousRoutes } from "./configurations/WebRouter";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [role, setRole] = useState(0);
  const store = configureStore();
  let routes;

  var subscriber = (msg, roleId) => {
    setRole(roleId);
  };

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("email");
    setUserId(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    PubSub.subscribe("userrole", subscriber);
    const userSession = localStorage.getItem("user") || "";
    if (userSession.length !== 0) {
      setIsLoggedIn(true);
      setUserId(userSession);
    }
  }, []);

  if (isLoggedIn) {
    if (localStorage.getItem("role") == "1") {
      routes = adminRoutes;
    } else {
      routes = userRoutes;
    }
  } else {
    routes = anonymousRoutes;
  }
  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
          role: role,
        }}
      >
        <Router>
          {isLoggedIn && <MainNavigation />}
          <div>{routes}</div>
          {isLoggedIn &&  localStorage.getItem("role") == 2 && <div style={{position:"relative",bottom:0,width:"100%"}}>

          <Footer  />   </div>}
       
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
