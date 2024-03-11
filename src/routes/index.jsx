import { Suspense, lazy } from "react";
import { Layout } from "../dashboard/layout";
import { Outlet } from "react-router-dom";

const FornecedoresListView = lazy(() => import('src/pages/fornecedor'))
const CadastroFornecedor = lazy(() => import('src/pages/fornecedor/cadastro'))

const ClienteListView = lazy(() => import('src/pages/cliente'))
const CadastroCliente = lazy(() => import('src/pages/cliente/cadastro'))

const ProdutoListView = lazy(() => import('src/pages/produto'))
const CadastroProduto = lazy(() => import('src/pages/produto/cadastro'))

const VendaListView = lazy(() => import('src/pages/venda'))
const NovaVenda = lazy(() => import('src/pages/venda/nova-venda'))

const OrcamentoListView = lazy(() => import('src/pages/orcamento'))
const NovoOrcamento = lazy(() => import('src/pages/orcamento/novo-orcamento'))
const TransformarEmVenda = lazy(() => import('src/pages/orcamento/transformar-em-venda'))

const ComprasListView = lazy(() => import('src/pages/compras'))
const NovaCompra = lazy(() => import('src/pages/compras/nova-compra'))

export const routes = [
    {
        path: '/',
        element: (
            <Layout>
                <Suspense>
                    <Outlet />
                </Suspense>
            </Layout>
        ),
        children: [
            {
                index: true,
                element: <h1>wip</h1>
            },
            {
                path: 'fornecedor',
                children: [
                    {
                        index: true,
                        element: <FornecedoresListView />
                    },
                    {
                        path: 'cadastrar',
                        element: <CadastroFornecedor />
                    }
                ]
            },
            {
                path: 'cliente',
                children: [
                    {
                        index: true,
                        element: <ClienteListView />
                    },
                    {
                        path: 'cadastrar',
                        element: <CadastroCliente />,
                        children: [{
                            path: ':id',
                            element: <CadastroCliente />,
                        }]
                    }
                ]
            },
            {
                path: 'produto',
                children: [
                    {
                        index: true,
                        element: <ProdutoListView />
                    },
                    {
                        path: 'cadastrar',
                        element: <CadastroProduto />,
                        children: [{
                            path: ':id',
                            element: <CadastroProduto />,
                        }]
                    }
                ]
            },
            {
                path: 'orcamento',
                children: [
                    {
                        index: true,
                        element: <OrcamentoListView />
                    },
                    {
                        path: 'novo-orcamento',
                        element: <NovoOrcamento />
                    },
                    {
                        path: 'transformar-em-venda',
                        element: <TransformarEmVenda />
                    }
                ]
            },
            {
                path: 'venda',
                children: [
                    {
                        index: true,
                        element: <VendaListView />
                    },
                    {
                        path: 'nova-venda',
                        element: <NovaVenda />
                    }
                ]
            },
            {
                path: 'compra',
                children: [
                    {
                        index: true,
                        element: <ComprasListView />
                    },
                    {
                        path: 'nova-compra',
                        element: <NovaCompra />
                    }
                ]
            },
        ]
    },
]