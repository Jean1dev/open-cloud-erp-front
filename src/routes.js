import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/pages/clientes';
import CadastroCliente from 'src/pages/clientes/CadastroCliente'
import DashboardView from 'src/pages/dashboard';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import ProdutosListView from 'src/pages/produtos';
import CadastroProduto from 'src/pages/produtos/CadastroProduto';
import CadastroCompra from 'src/pages/compras/CadastroCompra';
import CadastroVenda from 'src/pages/vendas/CadastroVenda';
import ReportsView from 'src/views/reports/DashboardView';
import Compras from 'src/pages/compras';
import Vendas from 'src/pages/vendas';
import SelecaoRelatorio from 'src/pages/relatorios';
import FornecedoresListView from 'src/pages/fornecedores';
import CadastroFornecedor from 'src/pages/fornecedores/CadastroFornecedor';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'cadastro-cliente', element: <CadastroCliente /> },
      { path: 'cadastro-fornecedor', element: <CadastroFornecedor /> },
      { path: 'cadastro-produto', element: <CadastroProduto /> },
      { path: 'cadastro-compra', element: <CadastroCompra /> },
      { path: 'cadastro-venda', element: <CadastroVenda /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'fornecedores', element: <FornecedoresListView /> },
      { path: 'relatorios', element: <SelecaoRelatorio /> },
      { path: 'compras', element: <Compras /> },
      { path: 'vendas', element: <Vendas /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'dashboard-view', element: <ReportsView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'produtos', element: <ProdutosListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
