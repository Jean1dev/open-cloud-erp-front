import {
    Unstable_Grid2 as Grid,
    TextField,
    Button,
    Box,
    Stack,
    Container,
    Typography,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Table,
    Divider,
    CardHeader,
    Card,
    Autocomplete,
    FormControl
} from "@mui/material";

import { Scrollbar } from 'src/components/scrollbar';
import { useState, useEffect, useCallback } from 'react';
import api from 'src/api'

export const CarrinhoProdutos = ({ next, back, addProdutos }) => {
    const [produtos, setProdutos] = useState([]);
    const [produtosNoCarrinho, setProdutosNoCarrinho] = useState([])
    const [produtoForm, setProdutoForm] = useState(null)

    const onChange = useCallback((_, val) => {
        if (!val) {
            toast.error('Produto nao selecionado')
            return
        }

        const finded = produtos.find(cli => cli.nome === val)
        if (finded) {
            setProdutoForm({
                produto: finded,
                quantidade: 1,
                valorUnitario: finded.valorVenda.toFixed(2)
            })
        }
    }, [produtos])

    const finalizar = () => {
        addProdutos(produtosNoCarrinho)
        next()
    }

    const adicionarProdutoNoCarrinho = () => {
        setProdutosNoCarrinho([...produtosNoCarrinho, produtoForm])
        setProdutoForm(null)
    }

    const handleChange = (event) => {
        setProdutoForm({
            ...produtoForm,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        api.get('produto').then(response => {
            setProdutos(response.data)
        })
    }, [])

    return (
        <>
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}>
                <Container maxWidth="lg">
                    <Stack spacing={8}>
                        <form onSubmit={(event) => event.preventDefault()}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            freeSolo={true}
                                            options={produtos.map((i) => (i.nome))}
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
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Quantidade"
                                        name="quantidade"
                                        onChange={handleChange}
                                        type="number"
                                        value={produtoForm?.quantidade}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Valor"
                                        name="valorUnitario"
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        value={produtoForm?.valorUnitario}
                                        variant="outlined"
                                    />
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
                                    onClick={adicionarProdutoNoCarrinho}
                                    type="button"
                                    variant="contained"
                                >
                                    Adcionar
                                </Button>
                            </Box>
                        </form>
                        <Box
                            sx={{
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'neutral.800'
                                    : 'neutral.100',
                                p: 3,
                            }}
                        >
                            <Card>
                                <CardHeader title="Produtos vendidos" />
                                <Divider />
                                <Scrollbar>
                                    <Table sx={{ minWidth: 700 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Nome
                                                </TableCell>
                                                <TableCell>
                                                    Quantidade
                                                </TableCell>
                                                <TableCell>
                                                    Valor
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {produtosNoCarrinho.map((item) => {

                                                return (
                                                    <TableRow key={item.id}>
                                                        <TableCell>
                                                            <Typography variant="subtitle2">
                                                                {item.produto.nome}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.quantidade}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.valorUnitario}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Scrollbar>
                            </Card>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 3,
                            }}
                        >
                            <Button
                                onClick={back}
                                type="button"
                                variant="outlined"
                            >
                                Voltar
                            </Button>
                            <Button
                                onClick={finalizar}
                                type="button"
                                variant="contained"
                            >
                                Proximo
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
