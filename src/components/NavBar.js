import React, { useState, useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import AppContext from "./AppContext";

function NavBar() {
  const { setWhat, setWhere, setCurrJob, authUser } = useContext(AppContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function userSignOut() {
    signOut(auth);
  }

  function handleSearch(event) {
    event.preventDefault();
    setWhat(event.target.what.value);
    setWhere(event.target.where.value);
  }

  function handleClick(e) {
    setCurrJob(null);
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
    <Navbar className={styles.navbarContainer} expand="lg" collapseOnSelect>
      <Navbar.Brand className={styles.brandText} href="/">
        <span className="d-lg-none">JobHive</span>
        <span className="d-none d-lg-block">JobHive</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" variant="dark" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="ms-3 " href="#home">
            Home
          </Link>
          <Link onClick={handleClick} to="/tips" className="ms-3" href="#link">
            Tips
          </Link>
          {authUser ? (
            <Link onClick={handleClick} className="ms-3" to="/saved-jobs">
              Saved Jobs
            </Link>
          ) : null}
        </Nav>
        <Form onSubmit={handleSearch}>
          <div className={styles.searchContainer}>
            <FormControl
              type="text"
              placeholder="What"
              className={styles.searchInput}
              name="what"
            />
            <FormControl
              type="text"
              placeholder="Where"
              className={styles.searchInput}
              name="where"
            />
            <Button type="submit" className={styles.searchButton}>
              Search
            </Button>
          </div>
        </Form>
        {authUser ? (
          <Button
            className={styles.loginButton}
            variant="primary"
            onClick={userSignOut}
          >
            Logout
          </Button>
        ) : (
          <Button
            className={styles.loginButton}
            variant="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </Navbar.Collapse>
      <LoginModal
        show={showLogin}
        handleCloseLogin={handleCloseLogin}
        handleRegister={handleRegister}
        authUser={authUser}
      />
      <RegisterModal
        show={showRegister}
        handleCloseRegister={handleCloseRegister}
      />
    </Navbar>
  );
}
export default NavBar;
