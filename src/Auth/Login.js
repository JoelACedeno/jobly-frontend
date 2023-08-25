import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";

const Login = ({ login }) => {
    const history = useHistory();
    const [formData, setFormData] = useState({ username: "", password: "", });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
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
                    <Button onSubmit={handleSubmit}>Submit</Button>
                </Form>
            </Card>
        </div>
    )
}

export default Login;