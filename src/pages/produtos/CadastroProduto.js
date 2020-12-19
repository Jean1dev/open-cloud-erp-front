import React, { useCallback, useState } from 'react';
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

const useStyles = makeStyles(({
  root: {}
}));

const CadastroProduto = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    nome: '',
    ca: '',
    estoque: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const submitForm = useCallback(() => {
    api.post('produto', {
        nome: values.nome,
        telefone: values.telefone
    }).then(() => {
        alert('Produto cadastrado com sucesso')
        setValues({
            nome: '',
            ca: '',
            estoque: 0
        })
        setLoading(false)    
    })    

    setLoading(true)
  }, [values])

  if (loading) {
      return <LinearProgress/>
  }

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="inserindo novo produto"
          title="Produto"
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
            label="CA"
            margin="normal"
            name="ca"
            onChange={handleChange}
            type="text"
            value={values.ca}
            variant="outlined"
          />
              <TextField
            fullWidth
            label="estoque atual"
            margin="normal"
            name="estoque"
            onChange={handleChange}
            type="number"
            value={values.estoque}
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
            Salvar
          </Button>
        </Box>
      </Card>
    </form>
  );
};

CadastroProduto.propTypes = {
  className: PropTypes.string
};

export default CadastroProduto;
