import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { Form, FormGroup, Label, Input, Card, Button } from "reactstrap";

const SignUp = ({ signup }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }


    return (
        <div>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <FormGroup >
                        <Label for="username">Username</Label>
                        <Input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
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

export default SignUp;