import React, { createContext, useState, useContext, ReactNode } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';



// Define the shape of the snackbar context
interface SnackbarContextType {
    openSnackbar: (message: string, severity: AlertColor) => void;
  }
  
  // Create the context
  const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
  
  // Create a provider component
  export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');
  
    const openSnackbar = (message: string, severity: AlertColor) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    return (
      <SnackbarContext.Provider value={{ openSnackbar }}>
        {children}
        <Snackbar open={open} autoHideDuration={12000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </SnackbarContext.Provider>
    );
  };
  
  // Custom hook to use the snackbar
  export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
      throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
  };