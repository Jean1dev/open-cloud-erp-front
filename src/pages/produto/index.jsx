import React, { useState, useEffect, useCallback } from 'react';
import api from 'src/api'
import { paths } from 'src/paths'
import { Seo } from 'src/components/seo';
import {
  Box,
  Container,
  Stack,
  LinearProgress,
  Typography,
  Button,
  SvgIcon,
  Card
} from '@mui/material';
import { Download, Upload } from '@mui/icons-material';
import { Plus } from '@untitled-ui/icons-react';
import { ResultsListTable } from 'src/components/results-table';
import { useNavigate } from 'react-router-dom';
import { RouterLink } from 'src/components/router-link';
import { ProductListSearch } from 'src/components/produto/product-list-search';

const useSearchOpts = () => {
  const [state, setState] = useState({
    filters: {
      query: ''
    },
    page: 0,
    limit: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  })

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handlePageChange = useCallback((_, page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      limit: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    state,
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange: () => { },
  }
}

const ProdutoListView = () => {
  const searchOpts = useSearchOpts();
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api.get('produto/paginated', {
      params: {
        limit: searchOpts.state.limit,
        offset: searchOpts.state.page,
        nome: searchOpts.state.filters.query
      }
    }).then(response => {
      setLoading(false)
      setItems(response.data)
    })
  }, [
    searchOpts.state.limit,
    searchOpts.state.page,
    searchOpts.state.filters.query
  ])

  const editAction = useCallback((item) => {
    navigate(`cadastrar/${item.id}`, { replace: true, state: item })
  }, [])

  return (
    <>
      <Seo title="Produto" />
      <Box component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Produtos
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Upload />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Download />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  startIcon={(
                    <SvgIcon>
                      <Plus />
                    </SvgIcon>
                  )}
                  variant="contained"
                  LinkComponent={RouterLink}
                  href={paths.produto.cadastro}
                >
                  Novo Produto
                </Button>
              </Stack>
            </Stack>
            <Card>
              <ProductListSearch
                onFiltersChange={searchOpts.handleFiltersChange}
                onSortChange={searchOpts.handleSortChange}
                sortBy={searchOpts.state.sortBy}
                sortDir={searchOpts.state.sortDir}
              />

              { loading && <LinearProgress/> }
              {
                !loading && <ResultsListTable
                  count={items.totalElements}
                  items={items.content}
                  // onDeselectAll={customersSelection.handleDeselectAll}
                  // onDeselectOne={customersSelection.handleDeselectOne}
                  onPageChange={searchOpts.handlePageChange}
                  onRowsPerPageChange={searchOpts.handleRowsPerPageChange}
                  // onSelectAll={customersSelection.handleSelectAll}
                  // onSelectOne={customersSelection.handleSelectOne}
                  page={searchOpts.state.page}
                  rowsPerPage={searchOpts.state.limit}
                  // selected={customersSelection.selected}
                  cellName={['nome', 'ca', 'valorVenda', 'estoque']}
                  editAction={editAction}
                />
              }
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ProdutoListView;