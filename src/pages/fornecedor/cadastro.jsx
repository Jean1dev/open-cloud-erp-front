import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress'
import api from 'src/api'
import toast from 'react-hot-toast';

const CadastroFornecedor = () => {
    const [values, setValues] = useState({
        nome: '',
        telefone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const submitForm = useCallback((event) => {
        event.preventDefault()
        api.post('fornecedor', {
            nome: values.nome,
            telefone: values.telefone
        }).then(() => {
            toast('Fornecedor cadastrado com sucesso')
            setValues({
                nome: '',
                telefone: ''
            })
            setLoading(false)
        })

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
                        Fornecedor
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

export default CadastroFornecedor