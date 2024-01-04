import { useMemo } from "react"
import { paths } from "src/paths"
import { SvgIcon } from "@mui/material"
import { 
    CurrencyDollar, 
    HomeSmile, 
    UserCheck01, 
    Users01,
    Pencil01
} from "@untitled-ui/icons-react"
import { ShoppingBag } from "@mui/icons-material"

export const useSections = () => {
    return useMemo(() => {
        return [
            {
                items: [
                    {
                        title: 'Dashboard',
                        path: paths.index,
                        icon: (
                            <SvgIcon fontSize="small">
                                <HomeSmile />
                            </SvgIcon>
                        )
                    },
                    {
                        title: 'Fornecedor',
                        path: paths.fornecedor.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <UserCheck01 />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Consultar fornecedores',
                                path: paths.fornecedor.list
                            },
                            {
                                title: 'Cadastrar fornecedor',
                                path: paths.fornecedor.cadastro
                            }
                        ]
                    },
                    {
                        title: 'Cliente',
                        path: paths.cliente.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <Users01 />
                            </SvgIcon>
                        ),
                    },
                    {
                        title: 'Produto',
                        path: paths.produto.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <ShoppingBag />
                            </SvgIcon>
                        ),
                    },
                    {
                        title: 'Orcamento',
                        path: paths.orcamento.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <Pencil01 />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Consultar Orcamento',
                                path: paths.orcamento.list
                            },
                            {
                                title: 'Novo Orcamento',
                                path: paths.orcamento.criar
                            }
                        ]
                    },
                    {
                        title: 'Venda',
                        path: paths.venda.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <CurrencyDollar />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Consultar vendas',
                                path: paths.venda.list
                            },
                            {
                                title: 'Nova venda',
                                path: paths.venda.criar
                            }
                        ]
                    }
                ]
            }
        ]
    }, [])
}