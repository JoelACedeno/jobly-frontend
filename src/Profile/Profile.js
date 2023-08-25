import React, { useState, useContext } from "react";
import { Card, Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "./ContextProvider";
import JoblyApi from "../api"

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
            console.error(errors);
            return;
        }

        setFormData(f => ({ ...f, password: "" }));
        setCurrentUser(updatedUser);
    }


    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
    }

    return (
        <div>
            <Card>
                <h4>Profile</h4>
                <Form onSubmit={handleSubmit}>
                    <FormGroup >
                        <Label for="username">Username</Label>
                        <Input
                            name="username"
                            value={formData.username}
                            required />
                    </FormGroup>
                    <FormGroup >
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required />
                    </FormGroup>
                    <FormGroup >
                        <Label for="firstName">First Name</Label>
                        <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required />
                    </FormGroup>
                    <FormGroup >
                        <Label for="lastName">Last Name</Label>
                        <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required />
                    </FormGroup>
                    <FormGroup >
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required />
                    </FormGroup>
                    <Button onSubmit={handleSubmit}>Submit</Button>
                </Form>
            </Card>
        </div>
    )
}

export default Profile; 