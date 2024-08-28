import React, { useState, useRef } from 'react';

import { useSelector, Provider } from 'react-redux';
import { setFormState } from './store/formSlice';
import { store } from './store/store';
import { RootState } from './store/types';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Wizard from './components/Wizard';
import './App.css';


import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Ajv from 'ajv';
import schemaModel from './schema_model.json';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schemaModel);


// Main App component
const App: React.FC = () => {


  return (
    <Provider store={store}>
    

    <div className="app-container">
      <Header />
      <div className="main-area">
        <Sidebar />
        <main className="content">
            <Wizard />
        </main>
      </div>
    </div>


    </Provider>
  );
};

export default App;