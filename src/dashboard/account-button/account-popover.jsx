import { useCallback } from 'react';
import PropTypes from 'prop-types';
import User03Icon from '@untitled-ui/icons-react/build/esm/User03';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/paths';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    onClose?.();
    navigate(paths.index);
  }, [navigate, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{
        sx: {
          width: 220,
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }
      }}
      {...other}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            fontSize: '0.875rem',
            fontWeight: 700,
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            color: '#fff',
          }}
        >
          N
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            Nilton
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Administrador
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        <ListItemButton
          onClick={handleGoHome}
          sx={{ borderRadius: 1.5, px: 1.5, py: 0.75 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <SvgIcon fontSize="small">
              <User03Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" fontWeight={500}>
                Dashboard
              </Typography>
            }
          />
        </ListItemButton>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
