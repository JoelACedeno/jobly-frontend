import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home/Home";
import CompaniesList from "./Companies/CompaniesList";
import Company from "./Companies/Company";
import JobsList from "./JobsList";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";

const Routes = ({ login, signup, logout }) => {

    return (
        <div>
            <NavBar logout={logout} />
            <main>
                <Switch>
                    <Route exact path="/" >
                        <Home />
                    </Route>

                    <PrivateRoute exact path="/companies" >
                        <CompaniesList />
                    </PrivateRoute>

                    <PrivateRoute exact path="/companies/:handle" >
                        <Company />
                    </PrivateRoute>

                    <PrivateRoute exact path="/jobs" >
                        <JobsList />
                    </PrivateRoute>

                    <Route exact path="/login" >
                        <Login login={login} />
                    </Route>

                    <Route exact path="/signup" >
                        <SignUp signup={signup} />
                    </Route>

                    <Route exact path="/profile" >
                        <Profile />
                    </Route>

                    <Redirect />
                </Switch>
            </main>
        </div>

    )
}

export default Routes;