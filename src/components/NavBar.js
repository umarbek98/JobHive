import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import AppContext from './AppContext';

function NavBar() {
  const {setWhat, setWhere, setCurrJob, setAuthUser, authUser} = useContext(AppContext)
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  function userSignOut(){
    signOut(auth)
  }

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
      <Navbar.Brand className={'ms-4 text-primary'} href="/">JobHive</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="ms-2 text-primary" href="#home">Home</Link>
          <Link onClick={handleClick} to="/tips" className="ms-4 text-primary" href="#link">Tips</Link>
          {authUser ? <Link onClick={handleClick} className="ms-4 text-primary" to="/saved-jobs">Saved Jobs</Link> : null}
        </Nav>
        <Form inline onSubmit={handleSearch}>
            <div className='d-flex'>
                <FormControl type="text" placeholder="What" className="mr-sm-2 ms-4 me-4" name="what" />
                <FormControl type="text" placeholder="Where" className="mr-sm-2 me-2" name="where" />
                <Button type="submit">Search</Button>
            </div>
        </Form>
        {authUser ? <Button className={styles.loginButton} variant="primary" onClick={userSignOut}>Logout</Button>
         : <Button className={styles.loginButton} variant="primary" onClick={handleLogin}>Login</Button>}
      </Navbar.Collapse>
      <LoginModal show={showLogin} handleCloseLogin={handleCloseLogin} handleRegister={handleRegister} authUser={authUser}/>
      <RegisterModal show={showRegister} handleCloseRegister={handleCloseRegister}/>
    </Navbar>
  );
}
export default NavBar;