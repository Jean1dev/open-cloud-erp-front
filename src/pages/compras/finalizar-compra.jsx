import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export const FecharCompra = ({ fecharCompra, compra, back }) => {
    const valorTotal = `R$ ${compra.valor.toFixed(2)}`
    const subtotalAmount = valorTotal;
    const shippingAmount = valorTotal;
    const totalAmount = valorTotal;

    return (
        <Box sx={{ p: 3 }}>
            <form onSubmit={(event) => {
                event.preventDefault()
                fecharCompra()
            }}>
                <Card
                    sx={{ p: 3 }}
                    variant="outlined"
                >
                    <Typography variant="h6">
                        Pedido de compra
                    </Typography>
                    <List sx={{ mt: 2 }}>
                        {compra.produtos.map((product) => {
                            const price = `R$ ${(product.valorUnitario * product.quantidade)}`;

                            return (
                                <ListItem
                                    disableGutters
                                    key={product.id}
                                >
                                    <ListItemAvatar sx={{ pr: 2 }}>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                height: 100,
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                width: 100,
                                                '& img': {
                                                    width: '100%',
                                                    height: 'auto',
                                                },
                                            }}
                                        >
                                            <img
                                                alt={product.produto.nome}
                                                src="https://img.freepik.com/vetores-premium/icone-isolado-de-vetor-de-pacote-ilustracao-de-emoji-de-caixa-de-papelao-emoticon-isolado-de-vetor-de-caixa-de-papelao_603823-1111.jpg"
                                            />
                                        </Box>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={(
                                            <Typography
                                                sx={{ fontWeight: 'fontWeightBold' }}
                                                variant="subtitle2"
                                            >
                                                {product.produto.nome}
                                            </Typography>
                                        )}
                                        secondary={(
                                            <Typography
                                                color="text.secondary"
                                                sx={{ mt: 1 }}
                                                variant="body1"
                                            >
                                                {price}
                                            </Typography>
                                        )}
                                    />
                                    <ListItemSecondaryAction>
                                        <FormControl
                                            size="small"
                                            variant="outlined"
                                        >
                                            <Select value={product.quantidade}>
                                                <MenuItem value={1}>
                                                    1
                                                </MenuItem>
                                                <MenuItem value={2}>
                                                    2
                                                </MenuItem>
                                                <MenuItem value={3}>
                                                    3
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <Typography variant="subtitle2">
                            Subtotal
                        </Typography>
                        <Typography variant="subtitle2">
                            {subtotalAmount}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <Typography variant="subtitle2">
                            Shipping Tax
                        </Typography>
                        <Typography variant="subtitle2">
                            {shippingAmount}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="subtitle2">
                            Total
                        </Typography>
                        <Typography variant="subtitle2">
                            {totalAmount}
                        </Typography>
                    </Box>
                </Card>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 3,
                    }}
                >
                    <Button
                        color="primary"
                        type="button"
                        variant="outlined"
                        onClick={back}
                    >
                        Voltar
                    </Button>
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                    >
                        Fechar compra
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
