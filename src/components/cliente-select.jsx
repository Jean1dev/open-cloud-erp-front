import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import api from 'src/api';

const ClienteSelect = ({ addCliente, className, ...rest }) => {
    const [clientes, setClientes] = useState([]);
    const [values, setValues] = useState({
        clienteSelecionado: undefined
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
        addCliente(event.target.value)
    };

    useEffect(() => {
        api.get('cliente').then(response => {
            setClientes(response.data)
            if (response.data.length >= 1) {
                addCliente(response.data[0].id)
            }
        })
    }, [addCliente])

    return (
        <form
            autoComplete="off"
            noValidate
            {...rest}
        >
            <Card>
                <CardHeader
                    title="Cliente"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                name="clienteSelecionado"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.clienteSelecionado}
                                variant="outlined"
                            >
                                {clientes.map((cliente) => (
                                    <option
                                        key={cliente.id}
                                        value={cliente.id}
                                    >
                                        {cliente.nome}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    );
};

ClienteSelect.propTypes = {
    className: PropTypes.string
};

export default ClienteSelect;
