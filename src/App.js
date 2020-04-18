import React from 'react';
import './App.css';
// eslint-disable-next-line
import regeneratorRuntime from 'regenerator-runtime';
import AuthProvider from './component/AuthProvider.js';
import Toolbar from './component/Toolbar.js';
import ListNews from './component/ListNews';
// import DataComponent from './component/DataComponent.js';
// import ErrorComponent from './component/ErrorComponent.js';
// import LoadingComponent from './component/LoadingComponent.js';

export default function App() {
  const urlEnv = process.env.REACT_APP_URL;

  return (
    <React.Fragment>
      <AuthProvider url={urlEnv}>
        <Toolbar />
        <ListNews />
      </AuthProvider>
    </React.Fragment>
  );
}
