import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { auth} from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterModal({ show, handleCloseRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((useCredential) => {
      console.log(useCredential)
    }).catch((error) => {
      console.log(error)
    })
  }

    return(
        <Modal show={show} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
          <Button variant="primary" onClick={signUp}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default RegisterModal;