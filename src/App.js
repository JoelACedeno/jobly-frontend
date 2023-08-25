import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import JoblyApi from "./api";
import UserContext from "./ContextProvider";
import jwt_decode from "jwt-decode"
import useLocalStorage from "./UseLocalStorage";


export const TOKEN_ID = "jobly-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_ID);


  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token:", token);

    async function getCurrentUser() {
      if (token) {
        try {
          console.debug("RUNNING getCurrentUser")
          let { username } = jwt_decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          console.debug("API RETURNED USER", currentUser)
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo error", err)
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    setInfoLoaded(false);
    getCurrentUser();
    console.log("got current user:", currentUser);
  }, [token]);

  /** Log in to site */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token)

      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Sign up for site */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }


  /** Log out of site */
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  /** Check if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <p>Loading...</p>

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Routes login={login} signup={signup} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
