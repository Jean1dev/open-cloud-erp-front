import {
    Container,
    Unstable_Grid2 as Grid,
    Stack,
    SvgIcon,
    Typography,
    Box,
    LinearProgress,
    Link
} from "@mui/material";
import { useCallback } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import api, { baseURL } from 'src/api';
import { Seo } from 'src/components/seo'
import { ArrowLeft } from '@mui/icons-material';
import { RouterLink } from 'src/components/router-link';
import { paths } from "../../paths";
import { SelecionarClientStep } from "./selecionar-client-step";
import { CarrinhoProdutos } from "./carrinho-produto";
import { OrcamentoProgresso } from "./orcamento-progresso";
import { FinalizarOrcamento } from "./finalizar-orcamento";

function NovoOrcamento() {
    const [activeChapter, setActiveChapter] = useState(0)
    const [steps, setSteps] = useState({
        chapters: [
            {
                title: 'Cliente (Opcional)',
                description: 'Selecione o cliente dessa venda',
                step: 1
            },
            {
                title: 'Produtos',
                description: 'Adicione os produtos no carrinho',
                step: 2
            },
            {
                title: 'Conferencia',
                description: 'Confira se o orcamento esta de acordo',
                step: 3
            }
        ],
        description: 'Criar um novo orcamento',
        duration: '15 min',
        progress: 0,
        title: 'Novo orcamento'
    })
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState([])
    const [cliente, setCliente] = useState(undefined)
    const navigate = useNavigate()

    const atualizarTotal = useCallback((_items) => {
        const total = _items.reduce((sum, item) => sum + (item.quantidade * item.valorUnitario), 0)
        setTotal(total)
    })

    const addProdutos = useCallback((_items) => {
        setItems(_items)
        atualizarTotal(_items)
    }, [])

    const finalizar = useCallback(() => {
        setLoading(true)
        api.post('orcamento', {
            cliente,
            valorTotal: total,
            itens: items.map(i => ({
                produtoId: i.produto.id,
                quantidade: i.quantidade,
                valorUnitario: i.valorUnitario,
                valorTotal: i.quantidade * i.valorUnitario,
            })),
        }).then(({ data }) => {
            toast('orcamento adicionado')
            navigate('/orcamento', { replace: true })
            var win = window.open(`${baseURL}/orcamento/gerar-comprovante?id=${data.id}`, '_blank');
            win.focus();
        }).catch(() => {
            toast.error('Ocorreu um erro ao gravar a orcamento tente novamente')
            setLoading(false)
        })

    }, [items, navigate, cliente, total])

    const addCliente = useCallback(id => {
        setCliente(id)
    }, [])

    if (loading) {
        return <LinearProgress />
    }

    return (
        <>
            <Seo title="Novo orcamento" />
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    py: 3
                }}
            >
                <Container maxWidth="xl">
                    <Grid
                        container
                        spacing={4}
                    >
                        <Grid
                            xs={12}
                            md={4}
                        >
                            <Stack spacing={3}>
                                <div>
                                    <Link
                                        color="text.primary"
                                        component={RouterLink}
                                        href={paths.venda.list}
                                        sx={{
                                            alignItems: 'center',
                                            display: 'inline-flex'
                                        }}
                                        underline="hover"
                                    >
                                        <SvgIcon sx={{ mr: 1 }}>
                                            <ArrowLeft />
                                        </SvgIcon>
                                        <Typography variant="subtitle2">
                                            Voltar
                                        </Typography>
                                    </Link>
                                </div>
                                <OrcamentoProgresso steps={steps} activeChapter={activeChapter} />
                            </Stack>
                        </Grid>
                        <Grid
                            xs={12}
                            md={8}
                        >
                            {
                                activeChapter == 0 && (
                                    <SelecionarClientStep addCliente={addCliente} next={() => {
                                        setSteps({ ...steps, progress: 33 })
                                        setActiveChapter(1)
                                    }} />
                                )
                            }
                            {
                                activeChapter == 1 && (
                                    <CarrinhoProdutos addProdutos={addProdutos} next={() => {
                                        setSteps({ ...steps, progress: 66 })
                                        setActiveChapter(2)
                                    }}
                                        back={() => setActiveChapter(0)} />
                                )
                            }
                            {
                                activeChapter == 2 && (
                                    <FinalizarOrcamento
                                        back={() => setActiveChapter(1)}
                                        concluir={finalizar}
                                        data={{
                                            valor: total,
                                            produtos: items
                                        }}
                                    />
                                )
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default NovoOrcamento