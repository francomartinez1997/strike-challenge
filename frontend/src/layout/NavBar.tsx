import { AppBar, Typography, Toolbar, Box, IconButton, Link, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useAuthStore } from '../features/auth/store';

type NavBarProps = {
  mode: 'light' | 'dark';
  handleThemeChange: () => void;
  handleDrawerOpen: () => void;
  open: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ mode, handleThemeChange, handleDrawerOpen, open }) => {
  const user = useAuthStore(state => state.user);

  return (
    <AppBar position="fixed" color="default" sx={{ boxShadow: 'none', zIndex: 999999 }}>
      <Toolbar variant="dense">
        <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="1rem">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[open && { display: 'none' }]}
            >
              <MenuIcon />
            </IconButton>
            <Link
              underline="none"
              display="flex"
              alignItems="center"
              gap="0.25rem"
              href="https://strike.sh/es"
            >
              <BugReportIcon fontSize="large" color="primary" />
              <Typography fontSize="1.5rem" color="primary" fontWeight={800}>
                STRIKE
              </Typography>
            </Link>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <Typography>{`Hi ${user?.name} :)`}</Typography>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleThemeChange}
              sx={{ display: 'flex', gap: '0.5rem', textTransform: 'none' }}
            >
              <Typography>Theme</Typography>
              {mode === 'light' ? (
                <DarkModeIcon fontSize="medium" />
              ) : (
                <LightModeIcon fontSize="medium" />
              )}
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
