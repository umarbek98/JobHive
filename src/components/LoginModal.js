import React, { useState } from "react";
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import { auth} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginModal({show, handleCloseLogin, handleRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(false)

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((useCredential) => {
      if (useCredential){
        handleCloseLogin()
        setUserError(false)
        setEmail('')
        setPassword('')
      }
    }).catch((error) => {
      console.log(error)
      setUserError(true)
      setEmail('')
      setPassword('')
    })

  }

    return(
        <Modal show={show} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userError ? <Alert variant="danger">Wrong Email or Password</Alert> : null}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
          <Button variant="primary" onClick={signIn}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default LoginModal;
