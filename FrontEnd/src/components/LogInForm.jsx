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
      <div className="flex flex-col bg-slate-800 pt-8 px-10 pb-2 h-min w text-white rounded-lg">
        <h1 className="text-center pb-2">User Login</h1>
        <Form onSubmit={(e)=> handleSubimt(e)}>
          <Form.Group className="pb-3">
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
          <Button variant="primary" type="submit" className="my-4">
            Log In
          </Button>
          <h3 className="text-white">No Account? <Link to='/signup/'>Sign Up Here!</Link></h3>
        </Form>
      </div>
    </>
  )
}

export default LogInForm