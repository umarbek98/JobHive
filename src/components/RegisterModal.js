import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterModal({ show, handleCloseRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [registerError, setRegisterError] = useState(null)


  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        handleCloseRegister()
      }).catch((error) => {
        const newError = error.message.replace("Firebase: ", "").replace(" (auth/weak-password)", "");
        setRegisterError(newError)
      })
  }

  return (
    <Modal show={show} onHide={handleCloseRegister}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {registerError ? <Alert variant='danger'>{registerError}</Alert> : null}
        <Form onSubmit={signUp}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRegister}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;