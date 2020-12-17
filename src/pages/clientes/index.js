import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import api from '../../service/api'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      api.get('cliente').then(response => {
        setCustomers(response.data)
        setLoading(false)
      })
  }, [])

  if (loading) 
    return <LinearProgress  />

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
