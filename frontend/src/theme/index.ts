import { createTheme } from '@mui/material/styles';

const commonProps = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none', 
          '&:hover': {
            boxShadow: 'none' 
          },
        }
      }
    }
  },
   typography: {
    fontFamily: `'Poppins', sans-serif`
  }
};

export const darkTheme = createTheme({
  ...commonProps,
  palette: {
    mode: 'dark',
    primary: { main: '#ff1c1cff' },
    secondary: { main: '#ffd901ff' },
    background: {
      default: '#242424',
      paper: '#2e2e2e'
    },
    text: {
      primary: '#ffffffff',
      secondary: '#d4d4d4ff'
    }
  },
});

export const lightTheme = createTheme({
  ...commonProps,
  palette: {
    mode: 'light',
    primary: { main: '#ff1c1cff' },
    secondary: { main: '#ff5e00ff' },
    background: {
      default: '#ecececff',
      paper: '#e0e0e0ff'
    },
    text: {
      primary: '#212121',
      secondary: '#555555'
    }
  },
});
