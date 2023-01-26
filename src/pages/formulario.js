import React, { useContext, useEffect, useState } from "react";
import { useHideMenu } from "../hooks/useHideMenu"
import { SocketContext } from '../context/UiContext';
import { Divider, Typography } from "antd";
import axios from "axios";
import { CardContent, Collapse, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, } from "@mui/material";
import Box from '@mui/material/Box';

import { ExpandMore, KeyboardArrowRight } from "@mui/icons-material"

const { Title, Text } = Typography;

export const Formulario = () => {

    const { validando, factura } = useContext(SocketContext) /// DATA

    const [form, setForm] = useState({
        fecha: '',
        folio: '',
        nombreEmisor: '',
        rfcEmisor: '',
        regimenFiscalEmisor: '',
        nombreReceptor: '',
        rfcReceptor: '',
        usoCFDI_Receptor: '',
        subtotal: '',
        conceptos: [],
        impuesto: '',
        total: '',
        uuidaFac: ''

    })
    // ** CAMBIAR TRUE
    const [open, setOpen] = useState(false)
    const [oper, setOper] = useState(false)


    const handleClick = () => {
        setOpen(!open);
    }

    const handleClick2 = () => {
        setOper(!oper);
    }

    useHideMenu(true)

    console.log(form)

    useEffect(() => {

        if (validando) {
            setForm((form) => ({
                ...form,
                fecha: factura?.Fecha,
                folio: factura?.Folio,
                nombreEmisor: factura?.Emisor.Nombre,
                rfcEmisor: factura?.Emisor.RFC,
                regimenFiscalEmisor: factura?.Emisor.RegimenFiscal,
                nombreReceptor: factura?.Receptor.Nombre,
                rfcReceptor: factura?.Receptor.RFC,
                usoCFDI_Receptor: factura?.Receptor.UsoCFDI,
                subtotal: factura?.Subtotal,
                conceptos: factura?.Conceptos,
                total: factura?.Total,
                uuidaFac: factura?.TimbreFiscalDigital.UUID
            }))
        }
    }, [validando, factura])

    const onChange = ({ target }) => {
        const { name, value } = target
        setForm({
            ...form,
            [name]: value
        })
    }


    const onSubmit = async (ev) => {
        ev.preventDefault();
        console.log(form)
        setForm((form) => ({
            ...form,
            fecha: '',
            folio: '',
            nombreEmisor: '',
            rfcEmisor: '',
            regimenFiscalEmisor: '',
            nombreReceptor: '',
            rfcReceptor: '',
            usoCFDI_Receptor: '',
            conceptos: [],
            subtotal: '',
            total: '',
            uuidaFac: ''
        }))
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.post("http://localhost:8080/", form, config)
            console.log(res.data)
            // ** DEVOLVER ESTADO EN USECONTEXT

        } catch (error) {
            console.log(error)
        }
    }

    function renderRow(props) {
        const { index } = props;

        return (
            <React.Fragment key={index}>

                {form.conceptos.map((value, index) => (
                    <React.Fragment key={index}>

                        <List component="nav" >

                            <ListItem component="div" disablePadding>
                                <ListItemText
                                    // primary="Cantidad:"
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Clave Unidad:
                                                {`   ${value.ClaveUnidad}`}
                                            </Typography>
                                        </>
                                    }
                                />

                            </ListItem>
                        </List>

                        <List component="nav">
                            <ListItem component="div" disablePadding>
                                <ListItemText
                                    // primary="Cantidad:"
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Clave Provedor:
                                                {`   ${value.ClaveProdServ}`}
                                            </Typography>
                                        </>
                                    }
                                />

                            </ListItem>

                        </List>
                        <List component="nav">

                            <ListItem component="div" disablePadding>
                                <ListItemText
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Cantidad:
                                                {`   ${value.Cantidad}`}
                                            </Typography>
                                        </>
                                    }
                                />

                            </ListItem>

                        </List>

                        <List component="nav">
                            <ListItem component="div" disablePadding>
                                <ListItemText
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Descripción:
                                            </Typography>
                                            {`   ${value.Descripcion}`}
                                        </>
                                    }
                                />

                            </ListItem>

                        </List>

                        <List component="nav">
                            <ListItem component="div" disablePadding>
                                <ListItemText
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Importe:
                                            </Typography>
                                            {`   ${value.Importe}`}
                                        </>
                                    }
                                />

                            </ListItem>

                        </List>

                        <List component="nav">
                            <ListItem component="div" disablePadding>
                                <ListItemText
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Valor Unitario:
                                            </Typography>
                                            {`   ${value.ValorUnitario}`}
                                        </>
                                    }
                                />

                            </ListItem>

                        </List>

                    </React.Fragment>
                ))}




            </React.Fragment>
        )
    }


    return (
        <>
            <div className="container">
                <Title lever={2}>Factura</Title>
                <Divider />

                <form
                    onSubmit={onSubmit}
                >
                    <Grid container spacing={2} justifyContent="center" alignItems="center" pb={5}>

                        <Grid item xs={12} sm={8} md="auto" lg={4}>
                            <Box border={2} borderRadius={2} p={2}>
                                <Grid container >
                                    <List component="nav">
                                        <ListItem disablePadding>
                                            <CardContent>
                                                <Title level={3}>Fecha: </Title>
                                            </CardContent>

                                            <CardContent>
                                                <TextField
                                                    error={false}
                                                    label="Fecha"
                                                    type="text"
                                                    name="fecha"
                                                    margin="dense"
                                                    variant="outlined"

                                                    color="success"
                                                    value={form.fecha}
                                                    onChange={onChange}

                                                />
                                            </CardContent>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={8} md lg={4}>
                            <Box border={2} borderRadius={2} p={2}>
                                <Grid container spacing={0}>
                                    <List component="nav">
                                        <ListItem disablePadding>
                                            <CardContent>
                                                <Title level={3}>Folio: </Title>
                                            </CardContent>

                                            <CardContent>
                                                <TextField
                                                    error={false}
                                                    label="Folio"
                                                    type="text"
                                                    name="fecha"
                                                    margin="dense"
                                                    variant="outlined"
                                                    color="success"
                                                    value={form.folio}
                                                    onChange={onChange}
                                                // helperText="Campo Obligatorio"
                                                />
                                            </CardContent>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Box>

                        </Grid>

                        <Grid item xs={12} sm={8} md lg={4}>
                            <Box border={2} borderRadius={2} p={2}>
                                <Grid >
                                    <List component="nav">
                                        <ListItem disablePadding>
                                            <CardContent>
                                                <Title level={3}>Timbre Fiscal: </Title>
                                            </CardContent>
                                            <TextField
                                                margin="dense"
                                                pt={0}
                                                error={false}
                                                label="Timbre Fiscal: "
                                                type="text"
                                                name="fecha"
                                                variant="outlined"
                                                fullWidth
                                                color="success"
                                                value={form.fecha}
                                                onChange={onChange}
                                            // helperText="Campo Obligatorio"
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Box>

                        </Grid>

                    </Grid>

                    <Grid container spacing={2} pb={2}>

                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <Box border={3} p={2}>
                                <Title level={3}>Emisor</Title>
                                <Divider />

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Nombre: </Text>
                                                <TextField
                                                    error={false}
                                                    label="Nombre del emisor"
                                                    type="text"
                                                    name="nombreEmisor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.nombreEmisor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent>
                                    <div className="h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>RFC: </Text>
                                                <TextField
                                                    error={false}
                                                    label="RFC del Emisor"
                                                    type="text"
                                                    name="rfcEmisor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.rfcEmisor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent>
                                    <div className="h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Regimen Fiscal: </Text>
                                                <TextField
                                                    error={false}
                                                    label="RFC del Emisor"
                                                    type="text"
                                                    name="regimenFiscalEmisor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.regimenFiscalEmisor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Box border={3} p={2}>
                                <Title level={3}>Receptor</Title>
                                <Divider />

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Nombre: </Text>
                                                <TextField
                                                    error={false}
                                                    label="Nombre del Receptor"
                                                    type="text"
                                                    name="nombreReceptor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.nombreReceptor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>RFC: </Text>
                                                <TextField
                                                    error={false}
                                                    label="RFC del Receptor"
                                                    type="text"
                                                    name="rfcReceptor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.rfcReceptor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>

                                <CardContent >
                                    <div className="row h6">
                                        <Box my={0}>
                                            <Grid container direction="row" spacing={2}>
                                                <Text>Uso CFDI: </Text>
                                                <TextField
                                                    error={false}
                                                    label="CFDI"
                                                    type="text"
                                                    name="usoCFDI_Receptor"
                                                    margin="dense"
                                                    variant="outlined"
                                                    fullWidth
                                                    color="success"
                                                    value={form.usoCFDI_Receptor}
                                                    onChange={onChange}
                                                />
                                            </Grid>
                                        </Box>
                                    </div>
                                </CardContent>
                            </Box>
                        </Grid>

                    </Grid>
                    <Divider />

                    <Grid container spacing={1} pb={2}>
                        <div className="col-12">
                            {
                                // Array.isArray(form.conceptos)
                                //     ? <h2>Es un array</h2>
                                //     : <h2>No un array</h2>
                            }
                            <CardContent >
                                <div className="row ">
                                    <Box border={3} p={2}>
                                        <Title level={3}>Conceptos: </Title>
                                        <Divider />
                                        <List component="nav">

                                            <ListItemButton onClick={handleClick2}>
                                                {oper ? <ExpandMore /> : <KeyboardArrowRight />}

                                                <ListItemText
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                1 &nbsp;
                                                            </Typography>

                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Materiales de construcción para vivi....
                                                            </Typography>

                                                        </>
                                                    }
                                                />
                                            </ListItemButton>

                                            <Collapse in={oper} timeout="auto" unmountOnExit>
                                                <List disablePadding>
                                                </List>
                                            </Collapse>


                                            <ListItemButton onClick={handleClick}>
                                                {open ? <ExpandMore /> : <KeyboardArrowRight />}

                                                <ListItemText
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                2 &nbsp;
                                                            </Typography>

                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Fabricación de piezzas segun mues...
                                                            </Typography>

                                                        </>
                                                    }
                                                />

                                            </ListItemButton>

                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {/* **TODO: TABLAS */}
                                                    <TableContainer component={Paper} sx={{ pl: 3, height: 256 }}>

                                                        <Table sx={{ minWidth: 650 }} >

                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Cantidad</TableCell>
                                                                    <TableCell>Descripción</TableCell>
                                                                    <TableCell>Valor Unitario</TableCell>
                                                                    <TableCell>Importe</TableCell>
                                                                </TableRow>
                                                            </TableHead>

                                                            <TableBody >
                                                                {form.conceptos.map((row, index) => (
                                                                    <TableRow
                                                                        key={index}
                                                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell scope="row">
                                                                            {row.Cantidad}
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">{row.Descripcion}</TableCell>
                                                                        <TableCell>${row.ValorUnitario}</TableCell>
                                                                        <TableCell>${row.Importe}</TableCell>

                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </List>
                                            </Collapse>
                                        </List>
                                    </Box>
                                </div>
                            </CardContent>
                        </div>

                        <Divider />
                    </Grid>

                    <div className="row">

                        <div className="col-4">
                            <CardContent >
                                <div className="row h6">
                                    <Box my={0}>
                                        <Grid container direction="row" spacing={2}>
                                            <Text>Subtotal: </Text>
                                            <TextField
                                                error={false}
                                                label="Subtotal"
                                                type="text"
                                                name="subtotal"
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                                color="success"
                                                value={form.subtotal}
                                                onChange={onChange}
                                            />
                                        </Grid>
                                    </Box>
                                </div>
                            </CardContent>

                            <CardContent >
                                <div className="row h6">
                                    <Box my={0}>
                                        <Grid container direction="row" spacing={2}>
                                            <Text>Impuesto: </Text>
                                            <TextField
                                                error={false}
                                                label="Impuesto"
                                                type="text"
                                                name="impuesto"
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                                color="success"
                                                value={form.impuesto}
                                                onChange={onChange}
                                            />
                                        </Grid>
                                    </Box>
                                </div>
                            </CardContent>

                            <CardContent >
                                <div className="row h6">
                                    <Box my={0}>
                                        <Grid container direction="row" spacing={2}>
                                            <Text>Total: </Text>
                                            <TextField
                                                error={false}
                                                label="Total"
                                                type="text"
                                                name="total"
                                                margin="dense"
                                                variant="outlined"
                                                fullWidth
                                                color="success"
                                                value={form.total}
                                                onChange={onChange}
                                            />
                                        </Grid>
                                    </Box>
                                </div>
                            </CardContent>
                        </div>



                    </div>
                    <Divider />

                    <div className="col-6">

                        <CardContent >
                            <div className="row h6">
                                <Box my={0}>
                                    <Grid container direction="row" spacing={2}>
                                        <Text>UUID: </Text>
                                        <TextField
                                            error={false}
                                            label="UUID"
                                            type="text"
                                            name="uuidaFac"
                                            margin="dense"
                                            variant="outlined"
                                            fullWidth
                                            color="success"
                                            value={form.uuidaFac}
                                            onChange={onChange}
                                        />
                                    </Grid>
                                </Box>
                            </div>
                        </CardContent>
                    </div>
                    <br />
                    <div className="text-center d-grid gap-2 col-6 mx-auto">

                        <button
                            className="btn btn-outline-success btn-lg"
                            type="submit"

                        >
                            Enviar
                        </button>



                    </div>

                </form>

            </div>
        </>
    )
}
