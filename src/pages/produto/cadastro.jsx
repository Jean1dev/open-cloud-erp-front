import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress'
import api from 'src/api'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const CadastroProduto = () => {
    const [values, setValues] = useState({
        nome: '',
        ca: '',
        estoque: 0,
        valorVenda: 0,
        id: '',
        valorCompra: 0
    });
    const [loading, setLoading] = useState(false);
    const { state } = useLocation()

    useEffect(() => {
        if (state) {
            setValues({
                nome: state.nome,
                ca: state.ca,
                estoque: state.estoque || 0,
                valorVenda: state.valorVenda || 0,
                valorCompra: state.valorCompra || 0,
                id: state.id
            })
        }
    }, [state])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const submitForm = useCallback((event) => {
        event.preventDefault()
        function success() {
            const message = values.id ? 'Produto Atualizado' : 'Produto cadastrado com sucesso'
            toast(message)
            setValues({
                nome: '',
                ca: '',
                estoque: 0,
                valorVenda: 0,
                valorCompra: 0
            })
            setLoading(false)
        }

        if (values.id) {
            api.put(`produto/${values.id}`, {
                nome: values.nome,
                ca: values.ca,
                estoque: values.estoque,
                valorVenda: values.valorVenda,
                valorCompra: values.valorCompra
            }).then(success)

        } else {

            api.post('produto', {
                nome: values.nome,
                ca: values.ca,
                estoque: values.estoque,
                valorVenda: values.valorVenda,
                valorCompra: values.valorCompra
            }).then(success)
        }

        setLoading(true)
    }, [values])

    const cancel = useCallback(() => {
        setValues({
            nome: '',
            ca: '',
            estoque: 0,
            valorVenda: 0,
            valorCompra: 0
        })
    }, [])

    if (loading) {
        return <LinearProgress />
    }

    return (
        <>
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}>
                <Container maxWidth="xl">
                    <Typography variant="h4">
                        Produto
                    </Typography>
                    <Box sx={{ p: 3 }}>
                        <form onSubmit={submitForm}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="nome"
                                    margin="normal"
                                    name="nome"
                                    onChange={handleChange}
                                    type="text"
                                    value={values.nome}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="CA"
                                    margin="normal"
                                    name="ca"
                                    onChange={handleChange}
                                    type="text"
                                    value={values.ca}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="estoque atual"
                                    margin="normal"
                                    name="estoque"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.estoque}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="valor de venda"
                                    margin="normal"
                                    name="valorVenda"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.valorVenda}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="valor de compra"
                                    margin="normal"
                                    name="valorCompra"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.valorCompra}
                                    variant="outlined"
                                />
                            </Stack>
                            <Divider sx={{ my: 3 }} />
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }} />
                                <Button color="inherit" onClick={cancel}>
                                    Cancel
                                </Button>
                                <Button
                                    sx={{ ml: 1 }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Confirm
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default CadastroProduto