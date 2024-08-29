import React, { useState, useRef } from 'react';

import { useSelector, Provider } from 'react-redux';
import { setFormState } from './store/formSlice';
import { store } from './store/store';
import { RootState } from './store/types';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Wizard from './components/wizard/Wizard';
import './App.css';


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