import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./ContextProvider";
import "./Nav.css"

const NavBar = ({ logout }) => {
    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <>
                <Nav className="ml-auto" navbar>
                    <NavLink className="nav-item" exact to="/companies">Companies</NavLink>
                    <NavLink className="nav-item" exact to="/jobs">Jobs</NavLink>
                    <NavLink className="nav-item" exact to="/profile">Profile</NavLink>
                    <NavLink className="nav-item" exact to="/login" onClick={logout}>
                        Logout {currentUser.first_name || currentUser.username}
                    </NavLink>
                </Nav>
            </>
        )
    }

    function loggedOutNav() {
        return (
            <>
                <Navbar expand="md">
                    <NavLink className="nav-item" exact to="/login">
                        Login
                    </NavLink>
                    <NavLink className="nav-item" exact to="/signup">
                        Sign Up
                    </NavLink>
                </Navbar>
            </>
        )
    }


    return (
        <Navbar className="Navbar" expand="md">
            <NavLink exact to="/" className="navbar-brand">
                Jobly
            </NavLink>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </Navbar>
    )
}

export default NavBar;