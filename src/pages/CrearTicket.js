import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useHideMenu } from '../hooks/useHideMenu'
import { SocketContext } from '../context/UiContext';
import { Typography, Divider } from "antd"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Box, CardContent, Grid, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
// import { Title } from '@mui/icons-material';
// import { MuiFileInput } from 'mui-file-input';
// import { useDispatch } from 'react-redux';
// import { getFacturas } from '../store/facturas/trunks';

export const CrearTicket = () => {

    const { Title, Text } = Typography

    // METODO DE OCULTAR MENU
    useHideMenu(true)

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

        // const config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         // 'Accept': 'application/json'
        //     }
        // }

        // const formData = new FormData();
        // const key = "f9c54ed6-d851-4772-9e9d-7bd75da75467"

        // formData.append('magic-key', key);
        // formData.append('xml-file', archivos);

        // try {
        //     const res = await axios.post("https://dolphin-app-2p6gu.ondigitalocean.app/cfdi/read", formData, config)
        //     // console.log(res.data)
        //     //** DEVOLVER ESTADO EN USECONTEXT
        //     recibirFactura(res.data)


        // } catch (error) {
        //     console.log(error)
        // }
    }

    
    

    const prueba= async()=>{
    
        
        try {
            const formData = new FormData();
            const key = "f9c54ed6-d851-4772-9e9d-7bd75da75467"
            console.log(key)
            
            formData.append('magic-key', key);

            await axios.get('https://dolphin-app-2p6gu.ondigitalocean.app/cfdi',formData,{headers: {
                'Content-Type': 'multipart/form-data'
                }})
                .then(response=>{
                console.log(response.data);
            })
                .catch(error=>{
                console.log("gu", error)
            })
        
        } catch (error) {
            console.log("dtdt", error)
        }
    }

    // HABILITAR Y DESABILITAR BUTTON
    const todoOk = () => {
        return (archivos?.type) ? true : false
    }

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
        {
            id: 'population',
            label: 'Population',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'size',
            label: 'Size\u00a0(km\u00b2)',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'density',
            label: 'Density',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
    ];

    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];

    const [page, setPage] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const dispatch= useDispatch()
    
    // useEffect(() => {
    //     dispatch(getFacturas())
    // }, [])
    


    return (
        <>
            <div className='container'>
                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" pb={5}>
                    <div className='col-12'>
                        <CardContent>
                            <div className='row'>
                                <Box border={3} p={2}>
                                    <Title lever={2}>Buscar</Title>
                                    {/* <Divider /> */}

                                    <Grid container spacing={4} justifyContent="center" >
                                        <Grid item lg={5}>
                                            <List component="nav">
                                                <ListItem disablePadding>

                                                    <TextField
                                                        error={false}
                                                        label="Empresa"
                                                        type="text"
                                                        name="fecha"
                                                        margin="dense"
                                                        variant="outlined"
                                                        fullWidth
                                                        color="success"
                                                    // value={form.fecha}
                                                    // onChange={onChange}
                                                    />
                                                </ListItem>

                                            </List>
                                        </Grid>
                                        <Grid item lg={3}>
                                            <List component="nav">
                                                <ListItem disablePadding>

                                                    <TextField
                                                        error={false}
                                                        label="Folio Fiscal"
                                                        type="text"
                                                        name="fecha"
                                                        margin="dense"
                                                        variant="outlined"
                                                        fullWidth
                                                        color="success"
                                                    // value={form.fecha}
                                                    // onChange={onChange}

                                                    />
                                                </ListItem>

                                            </List>
                                        </Grid>
                                        <Grid item lg={3} >
                                            <List component="nav">
                                                <ListItem disablePadding>

                                                    <CardContent >
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            onClick={()=>prueba()}


                                                        >
                                                            CARGAR
                                                        </Button>
                                                    </CardContent>
                                                </ListItem>

                                            </List>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>

                        </CardContent>
                    </div>
                </Grid>

                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                    <div className='col-12'>
                        <Box border={3} p={2}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ minWidth: 650 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>

                                                <TableCell align="right" sx={{ Width: 20 }}>#</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 30 }}>Fecha</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Empresa</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Cliente</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Subtotal</TableCell>
                                                <TableCell align="right" sx={{ minWidth: 170 }}>Total</TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            {/* {form?.conceptos.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                >
                                                    <TableCell scope="row">
                                                        {row.Cantidad}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">{row.Descripcion}</TableCell>
                                                    <TableCell>${row.ValorUnitario}</TableCell>
                                                    <TableCell>${row.Importe}</TableCell>

                                                </TableRow>
                                            ))} */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /> */}
                            </Paper>
                        </Box>
                    </div>
                </Grid>


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
            </div>




            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        </>
    )
}
