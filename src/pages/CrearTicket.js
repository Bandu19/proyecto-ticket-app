import React, { useContext, useState } from 'react'
import { Button, Col, Row} from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useHideMenu } from '../hooks/useHideMenu'
import { SocketContext } from '../context/UiContext';

import axios from 'axios'
import { Link } from 'react-router-dom'

export const CrearTicket = () => {

    // METODO DE OCULTAR MENU
    useHideMenu(false)

    // USECONTEXT
    const { recibirFactura } = useContext(SocketContext)


    const [archivos, setArchivos] = useState('')
    
    // ** FUNCION INPUT
    const subirArchivos = (e) => {
        console.log(e)
        setArchivos(e[0])
    }

    // ** FUNCION BUTTON
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
        try {
            const res = await axios.post("https://sea-lion-app-q3dmv.ondigitalocean.app/cfdi", formData, config)
            // console.log(res.data)
            //** DEVOLVER ESTADO EN USECONTEXT
            recibirFactura(res.data)


        } catch (error) {
            console.log(error)
        }
    }

     // HABILITAR Y DESABILITAR BUTTON
     const todoOk = () => {
        return (archivos?.type) ? true : false
    }

    return (
        <>
            <Row>
                <Col span={14} offset={6} align="center">
                    <input type='file' name='files' className='form-control form-control-lg' accept="text/xml" onChange={(e) => subirArchivos(e.target.files)} />
                </Col>
            </Row>

            <Row>
                <Col span={14} offset={6} align="center">
                    <br /><br />

                    <Link to="/formulario">
                        <Button
                            type="primary"
                            shape="round"
                            icon={<DownloadOutlined />}
                            size="large"
                            onClick={() => insertarArchivos()}
                            disabled={!todoOk()}
                            >
                            Insertar Archivos
                        </Button>
                    </Link>
               
                </Col>
            </Row>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </>
    )
}
