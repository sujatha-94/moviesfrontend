import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function SettingsPage() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <TextField
        label="Settings Option 1"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Settings Option 2"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Settings
      </Button>
    </Box>
  );
}