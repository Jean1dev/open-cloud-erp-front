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
import { ResultsListTable } from '../../components/results-table';
import { RouterLink } from 'src/components/router-link';

const FornecedoresListView = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    api.get('fornecedor/paginated', {
      params: {
        limit: limit,
        offset: page
      }
    }).then(response => {
      setItems(response.data)
      setLoading(false)
    })
  }, [limit, page])

  const onRowsPerPageChange = useCallback((val) => {
    setLoading(true)
    setLimit(val.target.value)
  }, [])

  const onPageChange = useCallback((_, it) => {
    setLoading(true)
    setPage(it)
  }, [])

  if (loading)
    return <LinearProgress />

  return (
    <>
      <Seo title="Fornecedor" />
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
                  Fornecedores
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
                  href={paths.fornecedor.cadastro}
                >
                  Novo Fornecedor
                </Button>
              </Stack>
            </Stack>
            <Card>
              {/* <CustomerListSearch
                onFiltersChange={customersSearch.handleFiltersChange}
                onSortChange={customersSearch.handleSortChange}
                sortBy={customersSearch.state.sortBy}
                sortDir={customersSearch.state.sortDir}
              />
              */}
              <ResultsListTable
                count={items.totalElements}
                items={items.content}
                // onDeselectAll={customersSelection.handleDeselectAll}
                // onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                // onSelectAll={customersSelection.handleSelectAll}
                // onSelectOne={customersSelection.handleSelectOne}
                page={page}
                rowsPerPage={limit}
                // selected={customersSelection.selected}
                cellName={['nome', 'telefone']}
              /> 
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default FornecedoresListView;