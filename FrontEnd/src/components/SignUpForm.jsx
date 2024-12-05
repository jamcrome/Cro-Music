import { useState } from "react";
import Form from "react-bootstrap/Form";
import { userRegistration } from "../utilities"
import { useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";

function SignUpForm() {

  const { setUser } = useOutletContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      first_name: firstName, 
      last_name: lastName,
      email: email,
      password: password
    };
    setUser(await userRegistration(formData));
    // TO-DO: try and except for errors
  };

  return (
    <>
      <Form onSubmit={(e)=> handleSubmit(e)}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="Name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            // value={password}
            // onChange={(e) => setEmail(e.target.value)}
            type="password"
          />
          <Form.Text className="text-muted">
            Must contain etc.....
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm