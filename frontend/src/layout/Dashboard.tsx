import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './NavBar';
import SideBar from './SideBar';

type DashboardLayoutProps = {
  handleThemeChange: () => void;
  mode: 'light' | 'dark';
};

const DRAWER_WIDTH = 300;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ mode, handleThemeChange }) => {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <NavBar
        mode={mode}
        handleThemeChange={handleThemeChange}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
      />
      <SideBar handleDrawerClose={handleDrawerClose} open={open} drawerWidth={DRAWER_WIDTH} />
      <Container
        component="main"
        maxWidth={false}
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 7,
          marginLeft: open ? `${DRAWER_WIDTH}px` : 0,
          width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          height: '90vh',
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};

export default DashboardLayout;
