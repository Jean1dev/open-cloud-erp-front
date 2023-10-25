import { Suspense, lazy } from "react";
import { Layout } from "../dashboard/layout";
import { Outlet } from "react-router-dom";

const FornecedoresListView = lazy(() => import('src/pages/fornecedor'))
const CadastroFornecedor = lazy(() => import('src/pages/fornecedor/cadastro'))

const ClienteListView = lazy(() => import('src/pages/cliente'))
const CadastroCliente = lazy(() => import('src/pages/cliente/cadastro'))

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
            }
        ]
    },
]