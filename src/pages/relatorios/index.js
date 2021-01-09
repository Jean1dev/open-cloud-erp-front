import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    makeStyles
} from '@material-ui/core';
import api, { baseURL } from 'src/service/api';

const useStyles = makeStyles(() => ({
    root: {}
}));

const SelecaoRelatorio = ({ className, ...rest }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        tipos: [],
        tipoSelecionado: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        api.get('relatorios').then(response => {
            setValues({
                tipoSelecionado: '',
                tipos: response.data
            })
        })
    }, [])

    const gerar = useCallback(() => {
        let url
        if (values.tipoSelecionado === 'VENDAS_AGRUPADO_POR_CLIENTE') {
            url = `${baseURL}/relatorios/clientes-agrupados`
        } else {
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            url = `${baseURL}/relatorios/vendas-mensais?mes=${month}&ano=${year}`
        }

        var win = window.open(url, '_blank');
        win.focus();
    }, [values])

    return (
        <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Card>
                <CardHeader
                    title="Seleção de relátorios"
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
                                name="tipoSelecionado"
                                onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.tipoSelecionado}
                                variant="outlined"
                            >
                                {values.tipos.map((tipo) => (
                                    <option
                                        key={tipo}
                                        value={tipo}
                                    >
                                        {tipo}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={gerar}
                    >
                        Gerar
          </Button>
                </Box>
            </Card>
        </form>
    );
};

export default SelecaoRelatorio;
