import React from 'react';
import { Container, Navbar } from 'react-bootstrap'
import { AiFillGithub, AiFillTwitterCircle, AiOutlineInstagram } from 'react-icons/ai'
import styled from 'styled-components'

const StyleFooterContainer = styled(Container)`
  display: flex;
  justify-content: center !important;
`

export default function Footer() {

  return (
    <div >
      <Container fluid className='pe-0 ps-0' style={{ position: 'fixed', width: '100%', bottom: '0' }}>
        <Navbar expand="lg" variant="dark" bg="dark">
          <StyleFooterContainer>
            <Navbar.Brand href="#" style={{ display: 'flex', fontSize: '15px' }}>Desarrollado por Ysnaldo López |
            <a href='https://github.com/YsnaldoXVen' target='_blank' >
                <AiFillGithub style={{ margin: '0 5px', fontSize: '20px', color: 'white' }} />
              </a>
              <a href='https://twitter.com/lopezh_yjose' target='_blank' >
                <AiFillTwitterCircle style={{ margin: '0 5px', fontSize: '20px', color: 'white' }} />
              </a>
              <a href='https://www.instagram.com/lopez_yjose/?hl=es-la' target='_blank' >
                <AiOutlineInstagram style={{ margin: '0 5px', fontSize: '20px', color: 'white' }} />
              </a>
            </Navbar.Brand>
          </StyleFooterContainer>
        </Navbar>
      </Container>
    </div>
  );
}