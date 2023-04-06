import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

function NavBar({ what, where, setWhat, setWhere, setCurrJob }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    setWhat(event.target.what.value)
    setWhere(event.target.where.value)
  }

  function handleClick(e){
    setCurrJob(null)
  }

  function handleLogin() {
    setShowLogin(true);
  }

  function handleCloseLogin() {
    setShowLogin(false);
  }

  function handleRegister() {
    setShowRegister(true);
    setShowLogin(false);
  }

  function handleCloseRegister() {
    setShowRegister(false);
  }

  return (
    <Navbar bg='dark' expand="lg">
      <Navbar.Brand className={'ms-4 text-primary'} href="#home">JobHive</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="ms-2 text-primary" href="#home">Home</Link>
          <Link onClick={handleClick} to="/tips" className="ms-4 text-primary" href="#link">Tips</Link>
        </Nav>
        <Form inline onSubmit={handleSearch}>
            <div className='d-flex'>
                <FormControl type="text" placeholder="What" className="mr-sm-2 ms-4 me-4" name="what" />
                <FormControl type="text" placeholder="Where" className="mr-sm-2 me-2" name="where" />
                <Button type="submit">Search</Button>
            </div>
        </Form>
        <Button className={styles.loginButton} variant="primary" onClick={handleLogin}>Login</Button>
      </Navbar.Collapse>
      {/* login modal */}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Don't have an account?
          </Button>
          <Button variant="primary" onClick={handleCloseLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      {/* register modal */}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
export default NavBar;