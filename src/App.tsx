import React from 'react';

import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';

import {  Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Wizard from './components/wizard/Wizard';
import './App.css';

const theme = createTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});


// Main App component
const App: React.FC = () => {

  return (
    <Provider store={store}>
    

    <div className="app-container">
      <Header />
      <div className="main-area">
        <Sidebar />
        <main className="content">
          <ThemeProvider theme={theme}>
            <Wizard />
          </ThemeProvider>
        </main>
      </div>
    </div>


    </Provider>
  );
};

export default App;