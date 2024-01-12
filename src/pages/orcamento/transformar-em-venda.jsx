import React, { useCallback, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import api from 'src/api'
import { toast } from 'react-hot-toast';
import ClienteSelect from 'src/components/cliente-select';
import { 
    LinearProgress,
    Card,
    CardHeader,
    Box,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button
} from '@mui/material';

const TransformarEmVenda = () => {
    const { state: orcamento } = useLocation()
    const [loading, setLoading] = useState(false)
    const [cliente, setCliente] = useState({})
    const [valorRecebido, setValorRecebido] = useState(orcamento.valorTotal)
    const navigate = useNavigate()

    const finalizar = useCallback(() => {
        setLoading(true)
        api.post('orcamento/transformar', {
            clienteId: cliente,
            valorRecebido,
            orcamentoId: orcamento.id
        }).then(() => {
            toast.success('Venda criada')
            navigate('../vendas', { replace: true })
        }).catch(() => {
            toast.error('Ocorreu um erro ao gravar tente novamente')
            setLoading(false)
        })

    }, [cliente, navigate, orcamento, valorRecebido])

    const addCliente = useCallback(id => {
        setCliente(id)
    }, [])

    if (loading) {
        return <LinearProgress />
    }

    return (
        <Card>
            <CardHeader subheader="Transformar orçamento em venda" />
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Box>
                            <Typography
                                align="left"
                                color="textPrimary"
                                gutterBottom
                                variant="h4"
                            > total R$: {orcamento.valorTotal}
                            </Typography>

                            <Card>
                                <CardHeader
                                    title="Informações do orçamento"
                                />

                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Valor Recebido pelo Cliente"
                                            name="valorRecebido"
                                            onChange={e => setValorRecebido(e.target.value)}
                                            type="number"
                                            value={valorRecebido}
                                            variant="outlined"
                                        />

                                    </Grid>
                                </CardContent>
                                <ClienteSelect addCliente={addCliente} />
                            </Card>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={finalizar}
                            > Transformar em venda </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Card>
    )
}

export default TransformarEmVenda