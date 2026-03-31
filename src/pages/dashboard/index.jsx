import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Divider,
  Chip,
} from '@mui/material';
import { alpha } from '@mui/system/colorManipulator';
import { useTheme } from '@mui/material/styles';
import {
  ShoppingBag,
  LocalShipping,
  TrendingUp,
  People,
  AttachMoney,
  Assignment,
  ArrowUpward,
} from '@mui/icons-material';
import { Seo } from 'src/components/seo';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import api from 'src/api';

const StatCard = ({ title, value, subtitle, icon, color, trend }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 30px ${alpha(color, 0.18)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: '0.08em',
                fontSize: '0.6875rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mt: 0.5,
                mb: 1,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              {value}
            </Typography>
            {trend && (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <SvgIcon sx={{ fontSize: 14, color: 'success.main' }}>
                  <ArrowUpward />
                </SvgIcon>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                  {trend}
                </Typography>
              </Stack>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              background: `linear-gradient(135deg, ${alpha(color, 0.15)}, ${alpha(color, 0.08)})`,
              border: `1px solid ${alpha(color, 0.2)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
              flexShrink: 0,
            }}
          >
            <SvgIcon sx={{ fontSize: 22 }}>
              {icon}
            </SvgIcon>
          </Box>
        </Stack>
      </CardContent>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.3)})`,
          borderRadius: '0 0 14px 14px',
        }}
      />
    </Card>
  );
};

const QuickAccessCard = ({ title, description, icon, color, href }) => {
  const theme = useTheme();

  return (
    <Card
      component={RouterLink}
      href={href}
      sx={{
        display: 'block',
        textDecoration: 'none',
        p: 2.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
          borderColor: alpha(color, 0.4),
          backgroundColor: alpha(color, 0.03),
          transform: 'translateY(-1px)',
          boxShadow: `0 6px 20px ${alpha(color, 0.12)}`,
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: alpha(color, 0.12),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            flexShrink: 0,
          }}
        >
          <SvgIcon sx={{ fontSize: 20 }}>{icon}</SvgIcon>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    produtos: '—',
    clientes: '—',
    vendas: '—',
    orcamentos: '—',
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [produtosRes, clientesRes, vendasRes, orcamentosRes] = await Promise.allSettled([
          api.get('produto/paginated', { params: { limit: 1, offset: 0 } }),
          api.get('cliente/paginated', { params: { limit: 1, offset: 0 } }),
          api.get('venda/paginated', { params: { limit: 1, offset: 0 } }),
          api.get('orcamento/paginated', { params: { limit: 1, offset: 0 } }),
        ]);

        setStats({
          produtos: produtosRes.status === 'fulfilled' ? produtosRes.value.data.totalElements ?? '—' : '—',
          clientes: clientesRes.status === 'fulfilled' ? clientesRes.value.data.totalElements ?? '—' : '—',
          vendas: vendasRes.status === 'fulfilled' ? vendasRes.value.data.totalElements ?? '—' : '—',
          orcamentos: orcamentosRes.status === 'fulfilled' ? orcamentosRes.value.data.totalElements ?? '—' : '—',
        });
      } catch (_) {}
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Produtos Cadastrados',
      value: stats.produtos,
      subtitle: 'No estoque',
      icon: <ShoppingBag />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Clientes',
      value: stats.clientes,
      subtitle: 'Clientes ativos',
      icon: <People />,
      color: theme.palette.success.main,
    },
    {
      title: 'Vendas',
      value: stats.vendas,
      subtitle: 'Total de vendas',
      icon: <AttachMoney />,
      color: '#F59E0B',
    },
    {
      title: 'Orçamentos',
      value: stats.orcamentos,
      subtitle: 'Gerados',
      icon: <Assignment />,
      color: '#8B5CF6',
    },
  ];

  const quickAccess = [
    {
      title: 'Nova Venda',
      description: 'Registrar uma venda',
      icon: <TrendingUp />,
      color: theme.palette.primary.main,
      href: paths.venda.criar,
    },
    {
      title: 'Novo Orçamento',
      description: 'Criar proposta',
      icon: <Assignment />,
      color: '#8B5CF6',
      href: paths.orcamento.criar,
    },
    {
      title: 'Nova Compra',
      description: 'Registrar entrada',
      icon: <LocalShipping />,
      color: '#F59E0B',
      href: paths.compra.criar,
    },
    {
      title: 'Cadastrar Produto',
      description: 'Adicionar ao estoque',
      icon: <ShoppingBag />,
      color: theme.palette.success.main,
      href: paths.produto.cadastro,
    },
  ];

  return (
    <>
      <Seo title="Dashboard" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            {/* Welcome Header */}
            <Box
              sx={{
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, ${alpha(theme.palette.primary.light, 0.8)} 100%)`,
                p: { xs: 3, md: 4 },
                position: 'relative',
                overflow: 'hidden',
                color: '#fff',
              }}
            >
              {/* decorative circles */}
              <Box sx={{
                position: 'absolute', right: -40, top: -40, width: 200, height: 200,
                borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
              }} />
              <Box sx={{
                position: 'absolute', right: 60, bottom: -60, width: 160, height: 160,
                borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
              }} />
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, mb: 0.5, color: '#fff' }}
                  >
                    Bem-vindo de volta, Nilton!
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>
                    Aqui está um resumo da sua empresa hoje.
                  </Typography>
                </Box>
                <Chip
                  label="ERP Cloud"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(4px)',
                    alignSelf: 'flex-start',
                  }}
                />
              </Stack>
            </Box>

            {/* Stats Cards */}
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block', fontWeight: 600 }}>
                Visão Geral
              </Typography>
              <Grid container spacing={2.5}>
                {statCards.map((card) => (
                  <Grid item xs={12} sm={6} lg={3} key={card.title}>
                    <StatCard {...card} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider />

            {/* Quick Access */}
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ mb: 2, display: 'block', fontWeight: 600 }}>
                Acesso Rápido
              </Typography>
              <Grid container spacing={2}>
                {quickAccess.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item.title}>
                    <QuickAccessCard {...item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
