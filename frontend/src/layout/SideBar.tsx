import { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Toolbar, IconButton, Drawer, List, styled, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from '../features/auth/store';

type SideBarProps = {
  handleDrawerClose: () => void;
  open: boolean;
  drawerWidth: number;
};

const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  height: 'fit-content',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: 0,
  margin: 0
}));

const SideBar: React.FC<SideBarProps> = ({ open, handleDrawerClose, drawerWidth }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(s => s.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Drawer
        variant="persistent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
        open={open}
      >
        <Box display="flex" height="100%" flexDirection="column" justifyContent="space-between">
          <Box>
            <Toolbar variant="dense" />
            <DrawerHeader>
              <IconButton size="small" onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <List>
              <ListItemButton
                sx={{ gap: 2, '&:hover': { backgroundColor: theme.palette.primary.main } }}
              >
                <ViewColumnIcon />
                Board
              </ListItemButton>
              <Divider />
            </List>
          </Box>
          <List>
            <Divider />
            <ListItemButton
              onClick={() => setOpenModal(true)}
              sx={{ gap: 2, '&:hover': { backgroundColor: theme.palette.primary.main } }}
            >
              <LogoutIcon />
              Logout
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
          <Typography>{user?.name}</Typography>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogActions sx={{ gap: 2 }}>
            <Button color="secondary" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="secondary" onClick={handleLogout} variant="contained">
              Log out
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default SideBar;
