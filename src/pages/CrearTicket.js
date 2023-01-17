import React, { useContext, useState } from 'react'
import { Button, Col, Row, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useHideMenu } from '../hooks/useHideMenu'
// import { SocketContext } from '../context/SocketContext'
import axios from 'axios'

const { Title, Text } = Typography

export const CrearTicket = () => {

    // METODO DE OCULTAR MENU
    // useHideMenu(true)
    useHideMenu(false)

    // USECONTEXT
    // const { socket } = useContext(SocketContext)


    // const [tickets, setTickets] = useState(null)
    // console.log(tickets)

    //
    // const nuevoTicket = () => {
    //     console.log("nuevoTicket")

    //     // ENVIANDO 3 parametros al socket
    //     socket.emit("solicitar-ticket", null, (ticket) => {
    //         console.log(ticket)

    //         setTickets(ticket)
    //     })
    // }

    // for(let index = 0; index < archivos.length; index++){
    //     f.append("files",archivos[index]);
    // }



    const [archivos, setArchivos] = useState('')
    console.log(archivos)

    // ** FUNCION
    const subirArchivos = (e) => {
        console.log(e)
        setArchivos(e[0])
    }

    // ** FUNCION
    const insertarArchivos = async () => {

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        }

        const formData = new FormData();
        const key = "f9c54ed6-d851-4772-9e9d-7bd75da75467"

        formData.append('magic-key', key);
        formData.append('xml-file', archivos);

        // console.log([...formData])

        await axios.post("https://sea-lion-app-q3dmv.ondigitalocean.app/cfdi", formData, config)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })

    }

    return (
        <>
            <Row>
                <Col span={14} offset={6} align="center">

                    <input type='file' name='files' multiple onChange={(e) => subirArchivos(e.target.files)} />

                </Col>
            </Row>

            <Row>
                <Col span={14} offset={6} align="center">
                    <br /><br />
                    <Button
                        type="primary"
                        shape="round"
                        icon={<DownloadOutlined />}
                        size="large"
                        onClick={() => insertarArchivos()}
                    >
                        Insertar Archivos
                    </Button>
                </Col>
            </Row>


            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />


            {/* <Row>
                <Col span={14} offset={6} align="center">

                    <Title level={3}>
                        Presione el boton para un nuevo ticket
                    </Title>

                    <Button
                        type="primary"
                        shape="round"
                        icon={<DownloadOutlined />}
                        size="large"
                        onClick={nuevoTicket}
                    >
                        Nuevo Ticket
                    </Button>

                </Col>
            </Row>

            {
                tickets && (
                    <Row style={{ marginTop: 100 }}>
                        <Col span={14} offset={6} align="center">

                            <Text level={2}>
                                Su número
                            </Text>
                            <br />

                            <Text type="success" style={{ fontSize: 55 }}>
                                {tickets.numero}
                            </Text>

                        </Col>
                    </Row>
                )
            } */}

        </>
    )
}
