import React, { createContext, useState, useContext, ReactNode } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
//import { makeStyles } from '@mui/styles';
import {  Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Wizard from './components/wizard/Wizard';

import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';


import './App.css';

const theme = createTheme();

/*const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});*/



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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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


// Main App component
const App: React.FC = () => {

  return (
    <Provider store={store}>
    

    <div className="app-container">
      <Header />      
      <div className="main-area">
        <SnackbarProvider>        
          <Sidebar />
          <main className="content">
            <ThemeProvider theme={theme}>
              <Wizard />
            </ThemeProvider>
          </main>
        </SnackbarProvider>        
      </div>
    </div>


    </Provider>
  );
};




export default App;