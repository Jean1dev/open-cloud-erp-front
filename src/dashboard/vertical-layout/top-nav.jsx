import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import { alpha } from '@mui/system/colorManipulator';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AccountButton } from '../account-button';

const TOP_NAV_HEIGHT = 60;
const SIDE_NAV_WIDTH = 260;

export const TopNav = (props) => {
  const { onMobileNavOpen, ...other } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: 'blur(8px)',
        backgroundColor: alpha(theme.palette.background.paper, 0.85),
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: 'sticky',
        left: {
          lg: `${SIDE_NAV_WIDTH}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2.5,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          {!lgUp && (
            <IconButton
              onClick={onMobileNavOpen}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                }
              }}
            >
              <SvgIcon fontSize="small">
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )}
        </Stack>

        <Stack alignItems="center" direction="row" spacing={1}>
          <AccountButton />
        </Stack>
      </Stack>
    </Box>
  );
};

TopNav.propTypes = {
  onMobileNavOpen: PropTypes.func,
};
