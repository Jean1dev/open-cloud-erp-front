import React, { useState, useEffect } from 'react';
import {
  Container,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
//import api from '../../service/api'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Compras = () => {
  const classes = useStyles();
  //const [customers, setCustomers] = useState([]);
  const [loading] = useState(false)

  useEffect(() => {
      
  }, [])

  if (loading) 
    return <LinearProgress  />

  return (
    <Page
      className={classes.root}
      title="Compras"
    >
      <Container maxWidth={false}>
        <Toolbar />
      
      </Container>
    </Page>
  );
};

export default Compras;
