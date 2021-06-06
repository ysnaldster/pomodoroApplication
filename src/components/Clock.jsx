import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { BsArrowUp } from 'react-icons/bs'
import { BsArrowDown } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import { GrPowerReset } from 'react-icons/gr'


const StyledMainContainer = styled(Container)`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const StyledMainGridContainer = styled.div`
    display: grid;
    grid-template-columns:50px 200px 50px;
    justify-items:center;
    align-items:center;
`



function Longitud({ titulo, tiempoCambiado, tipo, tiempo, formatoTiempo }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h3 style={{ padding: '15px' }}>{titulo}</h3>
            <StyledMainGridContainer >
                {
                    (tipo === 'break') ?
                        <>
                            <button onClick={() => tiempoCambiado(-60, tipo)} id='break-decrement' style={{ background: '#3d84b8', color: 'white', padding: '10px', border: 'none', borderRadius: '20px' }}>
                                <i >
                                    <BsArrowUp style={{ fontSize: '25px' }} />
                                </i>
                            </button>
                            <h3 id='break-length'>{formatoTiempo(tiempo)}</h3>
                            <button onClick={() => tiempoCambiado(60, tipo)} id='break-increment'
                                style={{ background: '#3d84b8', color: 'white', padding: '10px', border: 'none', borderRadius: '20px' }}>
                                <i>
                                    <BsArrowDown style={{ fontSize: '25px' }} />
                                </i>
                            </button>
                        </>
                        :
                        <>
                            <button onClick={() => tiempoCambiado(-60, tipo)} id='session-decrement' style={{ background: '#3d84b8', color: 'white', padding: '10px', border: 'none', borderRadius: '20px' }}>
                                <i >
                                    <BsArrowDown style={{ fontSize: '25px' }} />
                                </i>
                            </button>
                            <h3 id='session-length'>{formatoTiempo(tiempo)}</h3>
                            <button onClick={() => tiempoCambiado(60, tipo)} id='session-increment' style={{ background: '#3d84b8', color: 'white', padding: '10px', border: 'none', borderRadius: '20px' }}>
                                <i>
                                    <BsArrowUp style={{ fontSize: '25px' }} />
                                </i>
                            </button>
                        </>
                }
            </StyledMainGridContainer>
        </div>
    );
}

const Clock = () => {

    const [medirTiempo, setMedirTiempo] = useState(25 * 60);
    const [pararTiempo, setPararTiempo] = useState(5 * 60);
    const [sesion, setSesionTime] = useState(25 * 60);
    const [tiempoActivo, setTiempoActivo] = useState(false)
    const [activarParar, setActivarParar] = useState(false)
    const [romperSonido, setRomperSonido] = useState(
        new Audio("http://www.sonidosmp3gratis.com/sounds/huawei-bongo-ringtones.mp3")
    )

    const iniciarRomperSonido = () => {
        romperSonido.currentTime = 0;
        romperSonido.play();
    }

    const dispararTiempo = (tiempo) => {
        let segundos = tiempo % 60;
        let minutos = Math.floor(tiempo / 60);
        return (
            (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos)
        );
    };

    const tiempoCambiado = (cantidad, tipo) => {
        if (tipo == "break") {
            if (pararTiempo <= 60 && cantidad < 0) {
                return;
            }
            setPararTiempo(p => p + cantidad);
        } else {
            if (sesion <= 60 && cantidad < 0) {
                return;
            }
            setSesionTime(p => p + cantidad);
            if (!tiempoActivo) {
                setMedirTiempo(sesion + cantidad);
            }
        }
    }

    const controlarTiempo = () => {
        let segundo = 1000;
        let cita = new Date().getTime()
        let siguienteCita = new Date().getTime() + segundo;
        let activarPararVariable = activarParar;
        if (!tiempoActivo) {
            let intervalo = setInterval(() => {
                cita = new Date().getTime();
                if (cita > siguienteCita) {
                    setMedirTiempo(p => {
                        if (p <= 0 && !activarPararVariable) {
                            iniciarRomperSonido();
                            activarPararVariable = true;
                            setActivarParar(true)
                            return pararTiempo
                        } else if (p <= 0 && activarPararVariable) {
                            iniciarRomperSonido();
                            activarPararVariable = false;
                            setActivarParar(false);
                            return sesion;
                        }
                        return p - 1;
                    })
                    siguienteCita += segundo;
                }
            }, 30)
            localStorage.clear();
            localStorage.setItem('intervalo-id', intervalo)
        }

        if (tiempoActivo) {
            clearInterval(localStorage.getItem('intervalo-id'))
        }

        setTiempoActivo(!tiempoActivo);
    }
    const resetearTiempo = () => {
        setMedirTiempo(25 * 60);
        setPararTiempo(5 * 60);
        setSesionTime(25 * 60);
    }
    return (
        <div>
            <Header />
            <StyledMainContainer className='center-align d-md-none'>
                <h1>Pomodore Clock</h1>
                <div>
                    <div id='break-label'>
                        <Longitud
                            titulo={"Break Length"}
                            tiempoCambiado={tiempoCambiado}
                            tipo={"break"}
                            tiempo={pararTiempo}
                            formatoTiempo={dispararTiempo}

                        />
                    </div>
                    <div id='session-label'>
                        <Longitud
                            titulo={"Session Length"}
                            tiempoCambiado={tiempoCambiado}
                            tipo={"session"}
                            tiempo={sesion}
                            formatoTiempo={dispararTiempo}
                        />
                    </div>
                </div>
                <div style={{ border: '2px solid black', padding: '15px 20px', borderRadius: '20px', margin: '15px 0px' }}>
                    <h3 id='timer-label'>
                        {
                            activarParar ? "Break" : 'Session'
                        }
                    </h3>
                    <h1 id='time-left'>{dispararTiempo(medirTiempo)}</h1>
                </div>
                <Container>
                    <Row>
                        <Col xs={6} style={{ textAlign: 'center' }}>
                            <button onClick={controlarTiempo} id='start_stop' style={{ border: '2px solid black', padding: '15px 20px', borderRadius: '20px', margin: '15px 0px' }}>
                                {
                                    tiempoActivo ? (<i>
                                        <FaPause />
                                    </i>) :
                                        <i>
                                            <FaPlay />
                                        </i>
                                }
                            </button>
                        </Col>
                        <Col xs={6} style={{ textAlign: 'center' }}>
                            <button onClick={resetearTiempo} id='reset' style={{ border: '2px solid black', padding: '15px 20px', borderRadius: '20px', margin: '15px 0px' }}>
                                <i>
                                    <GrPowerReset />
                                </i>
                            </button>
                        </Col>
                    </Row>
                </Container>
            </StyledMainContainer>
            <StyledMainContainer className='center-align d-none d-md-flex'>
                <h1>Pomodore Clock</h1>
                <Container>
                    <Row>
                        <Col xs={6}>
                            <div id='break-label'>
                                <Longitud
                                    titulo={"Break Length"}
                                    tiempoCambiado={tiempoCambiado}
                                    tipo={"break"}
                                    tiempo={pararTiempo}
                                    formatoTiempo={dispararTiempo}
                                />
                            </div>

                        </Col>
                        <Col xs={6}>
                            <div id='session-label'>
                                <Longitud
                                    titulo={"Session Length"}
                                    tiempoCambiado={tiempoCambiado}
                                    tipo={"session"}
                                    tiempo={sesion}
                                    formatoTiempo={dispararTiempo}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div style={{ border: '2px solid black', padding: '15px 20px', borderRadius: '20px', margin: '15px 0px' }}>
                    <h3 id='timer-label'>
                        {
                            activarParar ? "Break" : 'Session'
                        }
                    </h3>
                    <h1 id='time-left'>{dispararTiempo(medirTiempo)}</h1>
                </div>
                <Container style = {{display: 'flex', justifyContent: 'center'}}>
                    <Row>
                        <Col xs={6}>
                            <button onClick={controlarTiempo} id='start_stop' style={{ border: '2px solid black', padding: '15px 20px', borderRadius: '20px', margin: '15px 0px' }}>
                                {
                                    tiempoActivo ? (<i>
                                        <FaPause />
                                    </i>) :
                                        <i>
                                            <FaPlay />
                                        </i>
                                }
                            </button>
                        </Col>
                        <Col xs={6}>
                            <button onClick={resetearTiempo} id='reset' style={{ border: '2px solid black', padding: '15px 20px', borderRadius: '20px', margin: '15px 0px' }}>
                                <i>
                                    <GrPowerReset />
                                </i>
                            </button>
                        </Col>
                    </Row>
                </Container>
            </StyledMainContainer>
            <Footer />
        </div>
    )
}



export default Clock
