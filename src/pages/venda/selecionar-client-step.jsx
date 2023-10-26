import { 
    Grid, 
    FormControl, 
    TextField, 
    Autocomplete, 
    Button, 
    SvgIcon, 
    Box, 
    Stack, 
    Container 
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from 'src/api';
import { ArrowRight } from '@mui/icons-material';

export const SelecionarClientStep = ({ addCliente, next }) => {
    const [clientes, setClientes] = useState([])

    const onChange = (_, val) => {
        if (!val) {
            toast.error('Cliente nao selecionado')
            return
        }

        const finded = clientes.find(cli => cli.nome === val)
        if (finded) {
            addCliente(finded.id)
        }
    }

    useEffect(() => {
        api.get('cliente').then(response => {
            setClientes(response.data)
        })
    }, [])

    return (
        <Box component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}>
            <Container maxWidth="lg">
                <Stack spacing={8}>
                    <form onSubmit={() => { }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        freeSolo={true}
                                        options={clientes.map((i) => (i.nome))}
                                        onChange={onChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                label="Nome"
                                                name="nome"
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 3,
                            }}
                        >

                            <Button
                                onClick={next}
                                type="button"
                                variant="contained"
                                startIcon={(
                                    <SvgIcon>
                                        <ArrowRight />
                                    </SvgIcon>
                                )}
                            >
                                Proximo
                            </Button>
                        </Box>
                    </form>
                </Stack>
            </Container>
        </Box>
    )
}