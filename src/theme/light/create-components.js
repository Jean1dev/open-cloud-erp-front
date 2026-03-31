import { alpha } from '@mui/system/colorManipulator';
import { backdropClasses } from '@mui/material/Backdrop';
import { filledInputClasses } from '@mui/material/FilledInput';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { paperClasses } from '@mui/material/Paper';
import { tableCellClasses } from '@mui/material/TableCell';
import { common } from '@mui/material/colors';

export const createComponents = ({ palette }) => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.light,
          color: palette.primary.dark,
          fontSize: '0.875rem',
          fontWeight: 600,
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          [`&:not(.${backdropClasses.invisible})`]: {
            backgroundColor: alpha(palette.neutral[900], 0.6),
            backdropFilter: 'blur(4px)',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          letterSpacing: '0.01em',
          textTransform: 'none',
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: 'none',
          }
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: alpha(palette.primary.main, 0.04),
          }
        },
        sizeSmall: {
          padding: '5px 14px',
          fontSize: '0.8125rem',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 28px',
          fontSize: '1rem',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: `1px solid ${palette.divider}`,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.04), 0px 4px 16px rgba(0, 0, 0, 0.04)'
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '20px 24px 0 24px',
        },
        title: {
          fontSize: '1rem',
          fontWeight: 600,
        },
        subheader: {
          fontSize: '0.8125rem',
          color: palette.text.secondary,
          marginTop: 4,
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          '&:last-child': {
            paddingBottom: 24,
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
          height: 24,
        },
        icon: {
          color: 'inherit'
        },
        outlined: {
          borderColor: palette.neutral[200],
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '#nprogress .bar': {
          backgroundColor: palette.primary.main
        },
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(palette.primary.main, 0.3)} transparent`,
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.9375rem',
        },
        input: {
          '&::placeholder': {
            color: palette.neutral[400],
            opacity: 1,
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          borderColor: palette.neutral[200],
          backgroundColor: palette.neutral[50],
          '&:hover': {
            backgroundColor: palette.neutral[100],
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: 'transparent'
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: alpha(palette.primary.main, 0.04),
            borderColor: palette.primary.main,
            boxShadow: `0 0 0 3px ${alpha(palette.primary.main, 0.16)}`
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main,
            boxShadow: `0 0 0 3px ${alpha(palette.error.main, 0.16)}`
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: common.white,
          '&:hover': {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.primary.light,
            }
          },
          [`&.${outlinedInputClasses.focused}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.primary.main,
              boxShadow: `0 0 0 3px ${alpha(palette.primary.main, 0.16)}`
            }
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.error.main,
              boxShadow: `0 0 0 3px ${alpha(palette.error.main, 0.16)}`
            }
          }
        },
        notchedOutline: {
          borderColor: palette.neutral[200],
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: alpha(palette.primary.main, 0.12),
        },
        bar: {
          borderRadius: 4,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        switchBase: {
          color: palette.neutral[500],
          '&.Mui-checked': {
            color: palette.primary.main,
          }
        },
        track: {
          borderRadius: 12,
          backgroundColor: palette.neutral[300],
          opacity: 1
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider,
          fontSize: '0.875rem',
          padding: '14px 16px',
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          [`& .${tableCellClasses.root}`]: {
            backgroundColor: '#F8FAFC',
            color: palette.neutral[600],
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            borderBottom: `2px solid ${palette.divider}`,
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: alpha(palette.primary.main, 0.03),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(palette.primary.main, 0.06),
            '&:hover': {
              backgroundColor: alpha(palette.primary.main, 0.09),
            }
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backdropFilter: 'blur(8px)',
          background: alpha(palette.neutral[900], 0.85),
          borderRadius: 8,
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '6px 12px',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.divider,
        }
      }
    }
  };
};
