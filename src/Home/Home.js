import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Home.css"
import UserContext from "../ContextProvider"
const Home = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div>
            <Card className="home-card">
                <CardTitle>
                    <h1>Jobly</h1>
                </CardTitle>
                <CardBody>
                    <p>All the jobs in one, convenient place</p>
                    {currentUser ?
                        <h2>Welcome back {currentUser.firstName || currentUser.username}</h2>
                        :
                        (
                            <p>
                                <Link to="/login">
                                    Log in
                                </Link>
                                <Link to="/signup">
                                    Sign up
                                </Link>
                            </p>
                        )
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default Home;