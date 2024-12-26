import { useState } from "react";
import Form from "react-bootstrap/Form";
import { userRegistration } from "../utilities"
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "react-bootstrap/Button";

function SignUpForm() {

  const { setUser } = useOutletContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      first_name: firstName, 
      last_name: lastName,
      email: email,
      password: password
    };
    setUser(await userRegistration(formData));
    navigate('../login/')
  };

  return (
    <>
      <div className="flex flex-col bg-slate-800 pt-8 px-10 pb-4 h-min text-white rounded-lg">
        <h1 className="text-center pb-2">User Sign-up</h1>
        <Form onSubmit={(e)=> handleSubmit(e)}>
          <Form.Group className="pb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="name"
              placeholder="ex: John"
            />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="Name"
              placeholder="ex: Smith"
            />
          </Form.Group>
          <Form.Group >
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <p className="text-slate-400 text-md pt-2">We will never share your email with anyone else.</p>
          </Form.Group>
          <Form.Group className="pb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="ex: 0-9a-zA-Z!@#$&?"
            />
            <Form.Label className="pt-3">Confirm Password</Form.Label>
            <Form.Control
              // value={password}
              // onChange={(e) => setEmail(e.target.value)}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUpForm