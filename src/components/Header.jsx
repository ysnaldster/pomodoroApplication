import React from 'react';
import { Container, Navbar } from 'react-bootstrap'

export default function Header() {
  return (
    <div>
      <Container fluid className = 'pe-0 ps-0'>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="#">Build a 25 + 5 Clock</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}