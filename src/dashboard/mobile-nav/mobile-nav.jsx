import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/system/colorManipulator';

import Logo from '../../components/logo';
import { RouterLink } from '../../components/router-link';
import { Scrollbar } from '../../components/scrollbar';
import { usePathname } from '../../hooks/use-pathname';
import { paths } from '../../paths';
import { MobileNavSection } from './mobile-nav-section';

const MOBILE_NAV_WIDTH = 260;

const useCssVars = (color) => {
  const theme = useTheme();

  return useMemo(() => {
    switch (color) {
      case 'blend-in':
      case 'discrete':
        if (theme.palette.mode === 'dark') {
          return {
            '--nav-bg': theme.palette.background.default,
            '--nav-color': theme.palette.neutral[100],
            '--nav-section-title-color': theme.palette.neutral[400],
            '--nav-item-color': theme.palette.neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.05)',
            '--nav-item-active-bg': alpha(theme.palette.primary.main, 0.2),
            '--nav-item-active-color': theme.palette.primary.light,
            '--nav-item-disabled-color': theme.palette.neutral[600],
            '--nav-item-icon-color': theme.palette.neutral[500],
            '--nav-item-icon-active-color': theme.palette.primary.light,
            '--nav-item-icon-disabled-color': theme.palette.neutral[700],
            '--nav-item-chevron-color': theme.palette.neutral[600],
            '--nav-scrollbar-color': theme.palette.neutral[400],
          };
        } else {
          return {
            '--nav-bg': '#FAFBFF',
            '--nav-color': theme.palette.neutral[700],
            '--nav-section-title-color': theme.palette.neutral[400],
            '--nav-item-color': theme.palette.neutral[600],
            '--nav-item-hover-bg': alpha(theme.palette.primary.main, 0.05),
            '--nav-item-active-bg': alpha(theme.palette.primary.main, 0.1),
            '--nav-item-active-color': theme.palette.primary.dark,
            '--nav-item-disabled-color': theme.palette.neutral[400],
            '--nav-item-icon-color': theme.palette.neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[400],
            '--nav-item-chevron-color': theme.palette.neutral[300],
            '--nav-scrollbar-color': theme.palette.neutral[400],
          };
        }

      case 'evident':
      default:
        return {
          '--nav-bg': '#1a1d27',
          '--nav-color': '#ffffff',
          '--nav-section-title-color': theme.palette.neutral[500],
          '--nav-item-color': 'rgba(255,255,255,0.55)',
          '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.06)',
          '--nav-item-active-bg': alpha(theme.palette.primary.main, 0.25),
          '--nav-item-active-color': '#ffffff',
          '--nav-item-disabled-color': theme.palette.neutral[600],
          '--nav-item-icon-color': 'rgba(255,255,255,0.4)',
          '--nav-item-icon-active-color': theme.palette.primary.light,
          '--nav-item-icon-disabled-color': theme.palette.neutral[600],
          '--nav-item-chevron-color': 'rgba(255,255,255,0.25)',
          '--nav-scrollbar-color': 'rgba(255,255,255,0.2)',
        };
    }
  }, [theme, color]);
};

export const MobileNav = (props) => {
  const { color = 'evident', open, onClose, sections = [] } = props;
  const pathname = usePathname();
  const cssVars = useCssVars(color);
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          ...cssVars,
          backgroundColor: 'var(--nav-bg)',
          color: 'var(--nav-color)',
          width: MOBILE_NAV_WIDTH,
          overflow: 'hidden',
        },
      }}
      variant="temporary"
    >
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': { height: '100%' },
          '& .simplebar-scrollbar:before': { background: 'var(--nav-scrollbar-color)' },
        }}
      >
        <Stack sx={{ height: '100%' }}>
          {/* Logo area */}
          <Box
            sx={{
              px: 2.5,
              pt: 3,
              pb: 2.5,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Box
              component={RouterLink}
              href={paths.index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.45)}`,
                  overflow: 'hidden',
                }}
              >
                <Logo style={{ width: 28, height: 28, objectFit: 'cover' }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.95)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  ERP Cloud
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Gestão Empresarial
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Nav */}
          <Stack
            component="nav"
            spacing={0.5}
            sx={{ flexGrow: 1, px: 1.5, pt: 2, pb: 2 }}
          >
            {sections.map((section, index) => (
              <MobileNavSection
                items={section.items}
                key={index}
                pathname={pathname}
                subheader={section.subheader}
              />
            ))}
          </Stack>

          {/* User */}
          <Box sx={{ px: 2, pb: 2.5, pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                N
              </Box>
              <Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.3 }}>
                  Nilton
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6875rem', lineHeight: 1.3 }}>
                  Administrador
                </Typography>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Scrollbar>
    </Drawer>
  );
};
