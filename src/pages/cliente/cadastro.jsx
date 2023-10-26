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

const CadastroCliente = () => {
    const [values, setValues] = useState({
        id: null,
        nome: '',
        telefone: ''
    });
    const [loading, setLoading] = useState(false);
    const { state } = useLocation()

    useEffect(() => {
        if (state) {
            setValues({
                id: state.id,
                nome: state.nome,
                telefone: state.telefone
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
            const message = values.id ? 'Cliente Atualizado' : 'Cliente cadastrado com sucesso'
            toast(message)
            setValues({
                nome: '',
                telefone: ''
            })
            setLoading(false)
        }

        if (values.id) {
            api.put('cliente', {
                id: values.id,
                nome: values.nome,
                telefone: values.telefone
            }).then(success)

        } else {

            api.post('cliente', {
                nome: values.nome,
                telefone: values.telefone
            }).then(success)
        }

        setLoading(true)
    }, [values])

    const cancel = useCallback(() => {
        setValues({
            nome: '',
            telefone: ''
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
                        Cliente
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
                                    label="telefone"
                                    margin="normal"
                                    name="telefone"
                                    onChange={handleChange}
                                    type="text"
                                    value={values.telefone}
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

export default CadastroCliente