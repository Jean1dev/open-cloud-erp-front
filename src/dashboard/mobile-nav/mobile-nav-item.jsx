import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import SvgIcon from '@mui/material/SvgIcon';

import { RouterLink } from 'src/components/router-link';

export const MobileNavItem = (props) => {
  const {
    active,
    children,
    depth = 0,
    disabled,
    external,
    icon,
    label,
    open: openProp,
    path,
    title,
  } = props;
  const [open, setOpen] = useState(!!openProp);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  let startIcon;

  if (depth === 0) {
    startIcon = icon;
  } else {
    startIcon = (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: 20,
          justifyContent: 'center',
          width: 20,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            backgroundColor: active ? 'var(--nav-item-icon-active-color)' : 'var(--nav-item-icon-color)',
            borderRadius: '50%',
            height: active ? 6 : 4,
            width: active ? 6 : 4,
            transition: 'all 0.2s ease',
          }}
        />
      </Box>
    );
  }

  const offset = depth === 0 ? 0 : (depth - 1) * 16;

  if (children) {
    return (
      <li style={{ listStyle: 'none' }}>
        <ButtonBase
          disabled={disabled}
          onClick={handleToggle}
          sx={{
            alignItems: 'center',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'flex-start',
            pl: `${12 + offset}px`,
            pr: '12px',
            py: '9px',
            textAlign: 'left',
            width: '100%',
            transition: 'background-color 0.15s ease',
            ...(active && depth === 0 && { backgroundColor: 'var(--nav-item-active-bg)' }),
            '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
          }}
        >
          {startIcon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: active ? 'var(--nav-item-icon-active-color)' : 'var(--nav-item-icon-color)',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 1.5,
                flexShrink: 0,
                transition: 'color 0.15s ease',
              }}
            >
              {startIcon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: active ? 'var(--nav-item-active-color)' : 'var(--nav-item-color)',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: depth > 0 ? '0.8125rem' : '0.875rem',
              fontWeight: depth > 0 ? 500 : 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'color 0.15s ease',
              ...(disabled && { color: 'var(--nav-item-disabled-color)' }),
            }}
          >
            {title}
          </Box>
          <SvgIcon
            sx={{
              color: 'var(--nav-item-chevron-color)',
              fontSize: 14,
              ml: 1,
              flexShrink: 0,
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
            }}
          >
            <ChevronDownIcon />
          </SvgIcon>
        </ButtonBase>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </li>
    );
  }

  const linkProps = path
    ? external
      ? { component: 'a', href: path, target: '_blank' }
      : { component: RouterLink, href: path }
    : {};

  return (
    <li style={{ listStyle: 'none' }}>
      <ButtonBase
        disabled={disabled}
        sx={{
          alignItems: 'center',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'flex-start',
          pl: `${12 + offset}px`,
          pr: '12px',
          py: '9px',
          textAlign: 'left',
          width: '100%',
          position: 'relative',
          transition: 'background-color 0.15s ease',
          ...(active && depth === 0 && {
            backgroundColor: 'var(--nav-item-active-bg)',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 3,
              height: '60%',
              borderRadius: '0 3px 3px 0',
              backgroundColor: 'var(--nav-item-icon-active-color)',
            }
          }),
          ...(active && depth > 0 && { backgroundColor: 'var(--nav-item-active-bg)' }),
          '&:hover': { backgroundColor: 'var(--nav-item-hover-bg)' },
        }}
        {...linkProps}
      >
        {startIcon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: active ? 'var(--nav-item-icon-active-color)' : 'var(--nav-item-icon-color)',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 1.5,
              flexShrink: 0,
              transition: 'color 0.15s ease',
            }}
          >
            {startIcon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: active ? 'var(--nav-item-active-color)' : 'var(--nav-item-color)',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: depth > 0 ? '0.8125rem' : '0.875rem',
            fontWeight: depth > 0 ? 500 : 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'color 0.15s ease',
            ...(disabled && { color: 'var(--nav-item-disabled-color)' }),
          }}
        >
          {title}
        </Box>
        {label && (
          <Box component="span" sx={{ ml: 2, flexShrink: 0 }}>
            {label}
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};

MobileNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
