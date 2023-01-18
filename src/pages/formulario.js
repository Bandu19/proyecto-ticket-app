import { Button, Divider, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu"
import { SocketContext } from '../context/UiContext';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Grid, TextField } from "@mui/material";

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
        impuesto: '',
        total: '',
        uuidaFac: ''

    })

    console.log(form)

    useEffect(() => {

        if (validando) {
            setForm((form) => ({
                ...form,
                fecha: factura.Fecha,
                folio: factura.Folio,
                nombreEmisor: factura.Emisor.Nombre,
                rfcEmisor: factura.Emisor.RFC,
                regimenFiscalEmisor: factura.Emisor.RegimenFiscal,
                nombreReceptor: factura.Receptor.Nombre,
                rfcReceptor: factura.Receptor.RFC,
                usoCFDI_Receptor: factura.Receptor.UsoCFDI,
                subtotal: factura.Subtotal,
                total: factura.Total,
                uuidaFac: factura.TimbreFiscalDigital.UUID
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
        // setForm((form) => ({
        //     ...form,
        //     fecha: '',
        //     folio: '',
        //     nombreEmisor: '',
        //     rfcEmisor: '',
        //     regimenFiscalEmisor:'',
        //     nombreReceptor: '',
        //     rfcReceptor: '',
        //     usoCFDI_Receptor: '',
        //     subtotal: '',
        //     total: '',
        //     uuidaFac: ''
        // }))
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


    useHideMenu(false)

    return (
        <>
            <div className="container">
                <Title lever={2}>Factura</Title>
                <Divider />

                <form
                    onSubmit={onSubmit}
                >
                    <div className="row ">
                        <div className="col-6 ">
                            <Text>Fecha: </Text>
                            {/* <input
                                type="text"
                                name="fecha"
                                className="form-control"
                                placeholder="Fecha"
                                value={form.fecha}
                                onChange={onChange}
                            /> */}
                            <Box my={2}>
                                <Grid container direction="row" spacing={2}>
                                    <CardContent>
                                        <TextField
                                            error={false}
                                            label="First Name"
                                            type="text"
                                            name="fecha"
                                            margin="dense"
                                            variant="outlined"
                                            fullWidth
                                            value={form.fecha}
                                            onChange={onChange}
                                            helperText="Campo Obligatorio"
                                        />
                                    </CardContent>
                                </Grid>
                            </Box>


                        </div>

                        <div className="col-6">
                            <Text>Folio: </Text>
                            <input
                                type="text"
                                name="folio"
                                className="form-control"
                                placeholder="folio"
                                value={form.folio}
                                onChange={onChange}
                            />
                            <br />
                        </div>

                    </div>


                    <div className="row">
                        <div className="col-6">
                            <Title level={3}>Emisor</Title>
                            <Divider />
                            <div className="row">
                                <div className="col">
                                    <Text>Nombre: </Text>
                                    <input
                                        type="text"
                                        name="nombreEmisor"
                                        className="form-control"
                                        placeholder="Nombre del emisor"
                                        value={form.nombreEmisor}
                                        onChange={onChange}
                                    />
                                    &nbsp;
                                    <br />
                                </div>
                            </div>
                            <div className="h6">
                                <Text>RFC: </Text>
                                <input
                                    type="text"
                                    name="rfcEmisor"
                                    className="form-control input-sm"
                                    placeholder="RFC del emisor"
                                    value={form.rfcEmisor}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <Text>Regimen Fiscal: </Text>
                            <input
                                type="text"
                                name="regimenFiscalEmisor"
                                className="form-control input-sm"
                                placeholder="Regimen Fiscal del emisor"
                                value={form.regimenFiscalEmisor}
                                onChange={onChange}
                            />
                        </div>

                        <div className="col-6">
                            <Title level={3}>Receptor</Title>
                            <Divider />

                            <Text>Nombre: </Text>
                            <input
                                type="text"
                                name="nombreReceptor"
                                className="form-control"
                                placeholder="Nombre del Receptor"
                                value={form.nombreReceptor}
                                onChange={onChange}
                            />
                            &nbsp;
                            <br />
                            <Text>RFC: </Text>
                            <input
                                type="text"
                                name="rfcReceptor"
                                className="form-control"
                                placeholder="RFC del receptor"
                                value={form.rfcReceptor}
                                onChange={onChange}
                            />
                            <br />
                            <Text>Uso CFDI: </Text>
                            <input
                                type="text"
                                name="usoCFDI_Receptor"
                                className="form-control"
                                placeholder="CFDI"
                                value={form.usoCFDI_Receptor}
                                onChange={onChange}
                            />

                            <br />
                        </div>
                    </div>
                    <Divider />

                    <div className="row">
                        <div className="col-3">
                            <div className="row">
                                <div className="col-4">
                                    <Text>Subtotal: </Text>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        name="subtotal"
                                        className="form-control"
                                        placeholder="Subtotal"
                                        value={form.subtotal}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            &nbsp;
                            <br />

                            <div className="row">
                                <div className="col-5">
                                    <Text>Impuesto: </Text>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        name="impuesto"
                                        className="form-control"
                                        placeholder="Impuesto"
                                        value={form.impuesto}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-5">
                                    <Text>Total: </Text>
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        name="total"
                                        className="form-control"
                                        placeholder="Total"
                                        value={form.total}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <Divider />
                    <div className="col-6">
                        <div className="row">
                            <div className="col-2">
                                <Text>UUID: </Text>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="uuidaFac"
                                    className="form-control"
                                    placeholder="UUID"
                                    value={form.uuidaFac}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="text-center">
                        <button
                            className="btn btn-outline-success btn-lg"
                            type="submit"

                        >
                            enviar
                        </button>
                        <Button
                            variant="outline"
                            color="primary"
                        >
                            Hello World
                        </Button>
                    </div>

                </form>
            </div>
        </>
    )
}
