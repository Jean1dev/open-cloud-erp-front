export const paths = {
    index: '/',
    fornecedor: {
        list: '/fornecedor',
        cadastro: '/fornecedor/cadastrar'
    },
    cliente: {
        list: '/cliente',
        cadastro: '/cliente/cadastrar'
    },
    produto: {
        list: '/produto',
        cadastro: '/produto/cadastrar'
    },
    venda: {
        list: '/venda',
        criar: '/venda/nova-venda'
    },
    compra: {
        list: '/compra',
        criar: '/compra/nova-compra'
    },
    orcamento: {
        list: '/orcamento',
        criar: '/orcamento/novo-orcamento',
        transformarEmVenda: '/orcamento/transformar-em-venda'
    }
}