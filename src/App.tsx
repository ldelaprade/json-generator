

import React, { useEffect, useRef } from 'react';


import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
//import { makeStyles } from '@mui/styles';
import {  Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Wizard from './components/wizard/Wizard';
import { SnackbarProvider } from './components/LogZone';



import './App.css';

const theme = createTheme();

/*const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});*/


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