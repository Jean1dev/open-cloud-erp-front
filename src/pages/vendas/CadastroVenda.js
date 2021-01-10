import React, { useCallback, useState } from 'react';
import {
    Card,
    CardHeader
} from '@material-ui/core';
import VendasDetail from './VendasDetail';
import ItemList from './Itemlist';
import api from 'src/service/api';
import { useNavigate } from 'react-router-dom';
import ClienteSelect from './ClienteSelect';

const CadastroVenda = () => {
    const [total, setTotal] = useState(0)
    const [valorRecebido, setValorRecebido] = useState(0)
    const [items, setItems] = useState([])
    const [cliente, setCliente] = useState(undefined)
    const navigate = useNavigate()

    const atualizarVenda = items => {
        const total = items.reduce((sum, item) => sum + (item.quantidade * item.valorUnitario), 0)
        setItems(items)
        setTotal(total)
        setValorRecebido(total)
    }

    const finalizar = useCallback(() => {
        api.post('venda', {
            cliente,
            valorRecebido,
            itens: items
        }).then(() => {
            alert('venda cadastrada')
            navigate('../produtos', { replace: true })
        })
    }, [items, navigate, cliente, valorRecebido])

    const addCliente = useCallback(id => {
        setCliente(id)
    }, [])

    return (
        <Card>
            <CardHeader
                subheader="Cadastro venda" />
                <VendasDetail 
                    total={total} 
                    valorRecebido={valorRecebido} 
                    setValorRecebido={setValorRecebido}
                    finalizar={finalizar}/>
                <ClienteSelect addCliente={addCliente}/>
                <ItemList atualizarVenda={atualizarVenda} />
        </Card>
    )
}

export default CadastroVenda