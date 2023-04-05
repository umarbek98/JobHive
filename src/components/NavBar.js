import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';

function NavBar({ what, where, setWhat, setWhere}) {
  function handleSearch(event) {
    event.preventDefault();
    setWhat(event.target.what.value)
    setWhere(event.target.where.value)
  }

  return (
    <Navbar bg='dark' expand="lg">
      <Navbar.Brand className={'ms-4 text-primary'} href="#home">JobHive</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" style={{}} className="ms-1 text-primary" href="#home">Home</Link>
          <Link to="/tips" className="ms-1 text-primary" href="#link">Tips</Link>
        </Nav>
        <Form inline onSubmit={handleSearch}>
            <div className='d-flex'>
                <FormControl type="text" placeholder="What" className="mr-sm-2 ms-4 me-4" name="what" />
                <FormControl type="text" placeholder="Where" className="mr-sm-2 me-2" name="where" />
                <Button type="submit">Search</Button>
            </div>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;