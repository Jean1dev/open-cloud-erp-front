import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core';
import moment from 'moment';
import { Share2, Trash, ExternalLink } from 'react-feather';
import api, { baseURL } from '../../service/api'
import { toastSuccess } from 'src/utils/toast';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, data, reload, page, limit, total, ...rest }) => {
  const classes = useStyles();
  const [selectedIds, setSelectedIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEnviarComprovante, setopenEnviarComprovante] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    let newSelectedIds;

    if (event.target.checked) {
      newSelectedIds = data.map((reg) => reg.id);
    } else {
      newSelectedIds = [];
    }

    setSelectedIds(newSelectedIds);
  };

  const transformEmVenda = orcamento => {
    navigate('../transformar-em-venda', { replace: true, state: orcamento })
  }

  const handleClickOpen = registro => {
    setOpen(true);
    setSelectedItem(registro);
  };

  const handleClose = () => {
    setOpen(false);
    setopenEnviarComprovante(false);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }

    setSelectedIds(newSelectedIds);
  };

  const handleLimitChange = (event) => {
    reload(event.target.value, page);
  };

  const handlePageChange = (event, newPage) => {
    reload(limit, newPage);
  };

  const generateReport = useCallback((id) => {
    setopenEnviarComprovante(true)
    setSelectedItem(id)
    window.open(`${baseURL}/orcamento/gerar-comprovante?id=${id}`, '_blank');
  }, [])

  const enviarComprovantePeloWhatsapp = useCallback(() => {
    api.post(`orcamento/${selectedItem}/enviar-comprovante?fone=${telefone}`)
      .then(() => {
        toastSuccess('Orçamento enviado');
        handleClose();
      })

  }, [selectedItem, telefone])

  const excluir = useCallback(() => {
    api.delete(`orcamento/${selectedItem.id}`).then(() => {
      toastSuccess('Orçamento removido');
      handleClose();
      reload(limit, page);
    })
  }, [selectedItem, limit, page, reload])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Dialog
            open={openEnviarComprovante}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Digite o numero para quem enviar esse comprovante</DialogTitle>
            <DialogContent>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.length === data.length}
                    color="primary"
                    indeterminate={
                      selectedIds.length > 0
                      && selectedIds.length < data.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Data
                </TableCell>
                <TableCell>
                  Total
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, limit).map((reg) => (
                <TableRow
                  hover
                  key={reg.id}
                  selected={selectedIds.indexOf(reg.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIds.indexOf(reg.id) !== -1}
                      onChange={(event) => handleSelectOne(event, reg.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {moment(reg.dataOrcamento).format('DD/MM/yyyy')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        R$ {reg.valorTotal}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <ExternalLink onClick={() => transformEmVenda(reg)} />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Trash onClick={() => handleClickOpen(reg)} />
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Share2 onClick={() => generateReport(reg.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={total}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Registros por pagina"
      />
    </Card>
  );
};

export default Results;
