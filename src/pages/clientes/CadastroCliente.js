import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import api from 'src/service/api';
import { toastSuccess } from 'src/utils/toast';
import { useLocation } from 'react-router';

const useStyles = makeStyles(({
  root: {}
}));

const CadastroCliente = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    id: null,
    nome: '',
    telefone: ''
  });
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    if (state) {
      setValues({
        id: state.id,
        nome: state.nome,
        telefone: state.telefone
      })
    }
  }, [state])

  const submitForm = useCallback(() => {
    function success() {
      const message = values.id ? 'Cliente Atualizado' : 'Cliente cadastrado com sucesso'
      toastSuccess(message)
      setValues({
        nome: '',
        telefone: ''
      })
      setLoading(false)
    }

    if (values.id) {
      api.put('cliente', {
        id: values.id,
        nome: values.nome,
        telefone: values.telefone
      }).then(success)

    } else {

      api.post('cliente', {
        nome: values.nome,
        telefone: values.telefone
      }).then(success)
    }

    setLoading(true)
  }, [values])

  if (loading) {
    return <LinearProgress />
  }

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader={values.id ? 'Atualizacao de cliente' : 'inserindo novo cliente'}
          title="Cliente"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="nome"
            margin="normal"
            name="nome"
            onChange={handleChange}
            type="text"
            value={values.nome}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="telefone"
            margin="normal"
            name="telefone"
            onChange={handleChange}
            type="text"
            value={values.telefone}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={submitForm}
          >
            {values.id ? 'Atualizar' : 'Salvar'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

CadastroCliente.propTypes = {
  className: PropTypes.string
};

export default CadastroCliente;
