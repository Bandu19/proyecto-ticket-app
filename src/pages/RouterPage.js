import React, { useContext } from 'react';

import { Cola } from './Cola';
import { CrearTicket } from './CrearTicket'
import { Ingresar } from './Ingresar'
import { Escritorio } from './Escritorio';
import { SocketContext } from '../context/UiContext';

import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";



import { Layout, Menu } from 'antd';
import { Formulario } from './formulario';

const { Sider, Content } = Layout;

export const RouterPage = () => {

    // const [collapsed, setCollapsed] = useState(false);

    const { ocultarMenu } = useContext(SocketContext)

    return (

        <Router>

            <Layout style={{ height: '100vh' }}>

                <Sider hidden={ocultarMenu}
                    // collapsible collapsed={collapsed}
                    breakpoint="md"
                    collapsedWidth="0"
                >

                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['4']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                // METIENDO ROUTER V6
                                label: <Link to="/ingresar">
                                    Ingresar
                                </Link>,
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: <Link to="/cola">
                                    list
                                </Link>,
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: <Link to="/crear">
                                    Enviar archivos xml
                                </Link>,
                            }
                        ]}
                    />
                </Sider>

                <Layout className="site-layout">

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >


                        <Routes>
                            <Route path="/ingresar" element={<Ingresar />} />
                            <Route path="/cola" element={<Cola />} />
                            <Route path="/escritorio" element={<Escritorio />} />


                            <Route path="/crear" element={<CrearTicket />} />
                            <Route path="/formulario" element={<Formulario />} />
                            
                            <Route path="/" element={<Navigate to="/crear" />} />

                        </Routes>

                    </Content>
                </Layout>
            </Layout>


        </Router >




    );

}
