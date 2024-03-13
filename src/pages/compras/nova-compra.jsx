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
import api from 'src/api';
import { Seo } from 'src/components/seo'
import { ArrowLeft } from '@mui/icons-material';
import { RouterLink } from 'src/components/router-link';
import { paths } from "../../paths";
import { CarrinhoProdutos } from "./carrinho-produto";
import { CompraProgresso } from "./compra-progresso";
import { SelecionarFornecedorStep } from "./selecionar-fornecedor-step";
import { FecharCompra } from "./finalizar-compra";

function NovaCompra() {
    const [activeChapter, setActiveChapter] = useState(0)
    const [steps, setSteps] = useState({
        chapters: [
            {
                title: 'Fornecedor (Opcional)',
                description: 'Selecione o fornecedor da compra',
                step: 1
            },
            {
                title: 'Produtos',
                description: 'Adicione os produtos no carrinho',
                step: 2
            },
            {
                title: 'Conferencia',
                description: 'Confira se a venda esta de acordo',
                step: 3
            }
        ],
        description: 'Criar uma nova compra',
        duration: '15 min',
        progress: 0,
        title: 'Nova compra'
    })
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState([])
    const [fornecedor, setFornecedor] = useState(undefined)
    const navigate = useNavigate()

    const atualizarTotal = items => {
        const total = items.reduce((sum, item) => sum + (item.quantidade * item.valorUnitario), 0)
        setTotal(total)
    }

    const addProdutos = useCallback((items) => {
        setItems(items)
        atualizarTotal(items)
    }, [])

    const finalizar = useCallback(() => {
        const enviarComprovante = confirm('Deseja enviar o comprovante de compra para o fornecedor?')
        setLoading(true)
        api.post('compra', {
            itens: items.map(item => ({
                produtoId: item.produto.id,
                quantidade: item.quantidade,
                valorUnitario: item.valorUnitario,

            })),
            fornecedor,
            enviarComprovante
        }).then(() => {
            toast('compra cadastrada')
            if (enviarComprovante) {
                toast('se o fornecedor tem um numero valido o comprovante enviado')
            }
            navigate('/compra', { replace: true })
        }).catch(() => {
            toast.error('Ocorreu um erro ao gravar a compra tente novamente')
            setLoading(false)
        })

    }, [items, navigate, fornecedor])

    const addFornecedor = useCallback((id) => {
        setFornecedor(id)
    }, [])

    if (loading) {
        return <LinearProgress />
    }

    return (
        <>
            <Seo title="Nova compra" />
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
                                        href={paths.compra.list}
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
                                <CompraProgresso steps={steps} activeChapter={activeChapter} />
                            </Stack>
                        </Grid>
                        <Grid
                            xs={12}
                            md={8}
                        >
                            {
                                activeChapter == 0 && (
                                    <SelecionarFornecedorStep addFornecedor={addFornecedor} next={() => {
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
                                    <FecharCompra
                                        back={() => setActiveChapter(1)}
                                        fecharCompra={finalizar}
                                        compra={{
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

export default NovaCompra