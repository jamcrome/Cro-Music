import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useOutletContext, useNavigate } from "react-router-dom"
import { userLogIn } from "../utilities";

function LogInForm() {

  const { setUser } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.location.reload();
  }

  const handleSubimt = async (e) => {
    e.preventDefault();
    let formData = {
      email: email,
      password: password
    };
    setUser(await userLogIn(formData));
    handleNavigation('/')
  };

  return(
    <>
      <Form onSubmit={(e)=> handleSubimt(e)}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group>
        <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
        <h3>Not Registered? <Link to='/signup/'>Sign Up Here</Link></h3>
      </Form>
    </>
  )
}

export default LogInForm