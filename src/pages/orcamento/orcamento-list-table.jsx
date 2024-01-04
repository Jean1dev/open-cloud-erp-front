import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Dialog,
    Checkbox,
    IconButton,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from '@mui/material'

import { Scrollbar } from 'src/components/scrollbar';
import { Trash01 } from '@untitled-ui/icons-react';
import { Share } from '@mui/icons-material';
import api, { baseURL } from 'src/api'
import toast from 'react-hot-toast';
import ClienteSelect from 'src/components/cliente-select';

export const OrcamentoListTable = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
    } = props;

    const [open, setOpen] = useState(false);
    const [openEnviarComprovante, setopenEnviarComprovante] = useState(false);
    const [selectedItem, setSelectedItem] = useState(undefined);

    const [telefone, setTelefone] = useState('');

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);
    const enableBulkActions = selected.length > 0;

    const handleClickOpen = registro => {
        setOpen(true);
        setSelectedItem(registro);
    };

    const handleClose = () => {
        setOpen(false);
        setopenEnviarComprovante(false)
    };

    const generateReport = useCallback((id) => {
        setopenEnviarComprovante(true)
        setSelectedItem(id)
        window.open(`${baseURL}/orcamento/gerar-comprovante?id=${id}`, '_blank');
    }, [])

    const enviarComprovantePeloWhatsapp = useCallback(() => {
        api.post(`orcamento/${selectedItem}/enviar-comprovante?fone=${telefone}`)
            .then(() => {
                toast.success('Orçamento enviado');
                handleClose();
            })

    }, [selectedItem, telefone])

    const excluir = useCallback(() => {
        api.delete(`orcamento/${selectedItem.id}`).then(() => {
            toast.success('Orçamento removido');
            handleClose();
            onPageChange(page);
        })
    }, [selectedItem, page])

    const clienteChange = useCallback((id) => {
        api.get(`cliente/telefone?id=${id}`)
            .then(response => setTelefone(response.data))
    }, [])

    return (
        <Box sx={{ position: 'relative' }}>
            <Dialog
                open={openEnviarComprovante}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Digite o numero para quem enviar esse comprovante</DialogTitle>
                <DialogContent>
                    <ClienteSelect addCliente={clienteChange} />
                    <TextField fullWidth
                        label="telefone"
                        margin="normal"
                        name="telefone"
                        onChange={(e) => setTelefone(e.target.value)}
                        type="text"
                        value={telefone}
                        variant="outlined">
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Voltar
                    </Button>
                    <Button onClick={enviarComprovantePeloWhatsapp} color="primary" autoFocus>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Você tem certeza que quer excluir esse orçamento?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Orçamento de R$ {selectedItem?.valorTotal}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Voltar
                    </Button>
                    <Button onClick={excluir} color="primary" autoFocus>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
            {enableBulkActions && (
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                            ? 'neutral.800'
                            : 'neutral.50',
                        display: enableBulkActions ? 'flex' : 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        px: 2,
                        py: 0.5,
                        zIndex: 10,
                    }}
                >
                    <Checkbox
                        checked={selectedAll}
                        indeterminate={selectedSome}
                        onChange={(event) => {
                            if (event.target.checked) {
                                onSelectAll?.();
                            } else {
                                onDeselectAll?.();
                            }
                        }}
                    />
                    <Button
                        color="inherit"
                        size="small"
                    >
                        Delete
                    </Button>
                    <Button
                        color="inherit"
                        size="small"
                    >
                        Edit
                    </Button>
                </Stack>
            )}
            <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            onSelectAll?.();
                                        } else {
                                            onDeselectAll?.();
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                Data
                            </TableCell>
                            <TableCell>
                                Cliente
                            </TableCell>
                            <TableCell>
                                Valor R$
                            </TableCell>
                            <TableCell align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {
                            const isSelected = selected.includes(item.id);

                            return (
                                <TableRow
                                    hover
                                    key={item.id}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onSelectOne?.(item.id);
                                                } else {
                                                    onDeselectOne?.(item.id);
                                                }
                                            }}
                                            value={isSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {item.dataOrcamento}
                                    </TableCell>
                                    <TableCell>
                                        {item.cliente?.nome}
                                    </TableCell>
                                    <TableCell>
                                        R$ {item.valorTotal}
                                    </TableCell>

                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => handleClickOpen(item)}
                                        >
                                            <SvgIcon>
                                                <Trash01 />
                                            </SvgIcon>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => generateReport(item.id)}
                                        >
                                            <SvgIcon>
                                                <Share />
                                            </SvgIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Registros por pagina"
            />
        </Box>
    );
};

OrcamentoListTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
};
