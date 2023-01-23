import { Divider, List, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu"
import { SocketContext } from '../context/UiContext';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import ArticleIcon from '@mui/icons-material/Article';
import { Box, CardContent, Grid, ListItem, ListItemText, TextField } from "@mui/material";

const { Title, Text } = Typography;
export const Formulario = () => {

    const { validando, factura } = useContext(SocketContext) /// DATA
    console.log(factura)
    // UseState
    // const inputRef = useRef(null);

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

    useHideMenu(false)

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
            conceptos: '',
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

    // const crearRows = (data)=>{
    //     // console.log(data)

    //    return(
    //     data?.forEach(element => {
    //         // console.log(element)
    //         // <div>{element.ClaveUnidad}</div>
    //         // <div key={element.Cantidad}>
    //         //      <CardContent>
    //         //         <div className="row h6">
    //         //             <Box my={0}>
    //         //                 <Grid container direction="row" spacing={2}>
    //         //                     <Text>Cantidad: </Text> 
    //         //                     {/* <TextField
    //         //                         error={false}
    //         //                         label="Subtotal"
    //         //                         type="text"
    //         //                         name="subtotal"
    //         //                         margin="dense"
    //         //                         variant="outlined"
    //         //                         fullWidth
    //         //                         color="success"
    //         //                         value={band.ClaveUnidad}
    //         //                         onChange={onChange}
    //         //                     /> */}
    //         //                  </Grid>
    //         //             </Box>
    //         //         </div>
    //         //     </CardContent> 
    //         // </div>
    //     })
    //     )
    // }

    return (
        <>
            <div className="container">
                <Title lever={2}>Factura</Title>
                <Divider />

                <form
                    onSubmit={onSubmit}
                >
                    <div className="row">
                        <div className="col-6 position-relative">
                            <Title level={2}>Fecha: </Title>
                            <Box my={2}>
                                <Grid container direction="row" justifyContent="center" spacing={2}>
                                    <CardContent>
                                        <TextField
                                            error={false}
                                            label="Fecha"
                                            type="text"
                                            name="fecha"
                                            margin="dense"
                                            variant="outlined"
                                            fullWidth
                                            color="success"
                                            value={form.fecha}
                                            onChange={onChange}
                                        // helperText="Campo Obligatorio"
                                        />
                                    </CardContent>
                                </Grid>
                            </Box>


                        </div>

                        <div className="col-6">
                            <Title level={2}>Folio: </Title>
                            <Box my={0}>
                                <Grid container direction="row" justifyContent="center" spacing={2}>
                                    <CardContent>
                                        <TextField
                                            error={false}
                                            label="Folio"
                                            type="text"
                                            name="folio"
                                            margin="dense"
                                            variant="outlined"
                                            fullWidth
                                            color="success"
                                            value={form.folio}
                                            onChange={onChange}
                                        // helperText="Campo Obligatorio"
                                        />
                                    </CardContent>
                                </Grid>
                            </Box>
                        </div>

                    </div>


                    <div className="row">
                        <div className="col-6">
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
                        </div>

                        <div className="col-6">
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
                        </div>
                    </div>
                    <Divider />

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

                        <div className="col-6">
                            {
                                // Array.isArray(form.conceptos)
                                //     ? <h2>Es un array</h2>
                                //     : <h2>No un array</h2>
                            }
                            <CardContent >
                                <div className="row h6">
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        <Text>Conceptos: </Text>
                                        {form.conceptos.map((value) => (
                                            <ListItem
                                                key={value}
                                                disableGutters
                                                alignItems="flex-start"
                                            >
                                                 <ListItemText
                                                    primary="Brunch this weekend?"
                                                    secondary={
                                                      <>
                                                        <Typography
                                                          sx={{ display: 'inline' }}
                                                          component="span"
                                                          variant="body2"
                                                          color="text.primary"
                                                        >
                                                          Ali Connors
                                                        </Typography>
                                                      </>
                                                    }
                                                 />
                                                {/* <ListItemText primary={`Line item ${value.Cantidad}`} /> */}

                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </CardContent>

                        </div>

                    </div>
                    <Divider />
                    <div className="col-9">

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
