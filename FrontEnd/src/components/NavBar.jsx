import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button';
import { userLogOut } from '../utilities';
import { Link } from 'react-router-dom';

function NavBar({ user }) {
  
  // const { user } = useOutletContext(useLoaderData());

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="signup/">Sign Up</Nav.Link> */}
            {user ? (
              <div>
                <Nav.Link as={Link} to="account/">Account</Nav.Link>
                <Button onClick={userLogOut}>Log Out</Button>
              </div>
            ) : (              
              <Nav.Link as={Link} to="login/">Log In</Nav.Link>
            )}
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;