import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import CreateVulnerabilityModal from './CreateVulnerabilityModal';

const BoardHeader = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setSearch(event.target.value);
    console.log('Buscando:', event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <TextField
        label="Search vulnerabilities"
        variant="outlined"
        size="small"
        value={search}
        onChange={handleChange}
        sx={{ width: '25rem' }}
      />
      <Button variant="contained" onClick={handleOpen}>+ new vulnerability</Button>
      <CreateVulnerabilityModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default BoardHeader;
