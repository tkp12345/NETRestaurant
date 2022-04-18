import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import React, { Component } from 'react';
import PageNotFound from './layout/PageNotFound'; 
import Main from './layout/Main'; 
import Header from './layout/Header'; 
import Login from './layout/Login'; 
import AppContainer from './layout/AppContainer'; 

function App() {
  return (
    <div className="App">
    {/* <AppContainer> */}
          <Header/> 
          <Routes>
            <Route  path="/" element={<Login/>} />
            <Route  path="/login" element={<Login/>} />
            {/* <Route path="/a" element={a} /> */}
            {/* <Route path="/b" element={b} /> */}
            <Route element={<PageNotFound/>} />
          </Routes>
    {/* </AppContainer> */}
    </div>
  );
}

export default App;
