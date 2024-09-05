import React from 'react';
import {  Provider } from 'react-redux';
import { store } from './store/store';
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