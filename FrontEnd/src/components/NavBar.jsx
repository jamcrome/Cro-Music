import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { userLogOut } from '../utilities';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useState } from 'react';


function NavBar({ user, setUser }) {
  
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("")

  const handleAccountNavigate = () => {
    navigate('account/')
    window.location.reload()
  }

  const handleLogout = async () => {
    userLogOut(setUser)
    navigate('login/')
  }

  const handleSubimt = async (e) => {
    e.preventDefault();
    navigate(`/composer-search/${searchTerm}`)
  }

  return (
    <Navbar className="bg-emerald-800 justify-content-between py-3">
      <Nav className='ml-4 flex-grow'>
        <Navbar.Brand className="">Cro-Music</Navbar.Brand>
        {user ? (
          <div className='flex'>
            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link onClick={handleAccountNavigate} className='text-white'>Account</Nav.Link>
            <Nav.Link onClick={handleLogout} className='text-white'>Log Out</Nav.Link>
          </div>
        ) : (              
          <Nav.Link as={Link} to="login/" className='text-white'>Log In</Nav.Link>
        )}
      </Nav>
      <Form className="flex justify-content-right mr-4" onSubmit={handleSubimt}>
        <Form.Control 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mr-sm-2" 
          type="search" 
          placeholder="Search"
        />
        <Button className="btn btn-outline-success text-white my-2 my-sm-0" type="submit">
          Search
        </Button>
      </Form>
    </Navbar>
  );
}

export default NavBar;