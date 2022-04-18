import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import React, { Component } from 'react';
import PageNotFound from './page/PageNotFound'; 
import Main from './page/Main'; 
import Header from './layout/Header'; 
import Login from './layout/Login'; 
import AppContainer from './layout/AppContainer'; 

function App() {
  return (
    <div className="App">
    <AppContainer>
          {/* <Header/>  */}
          <Routes>
            <Route  path="/" element={<Login/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/Main" element={<Main/>} />
            <Route element={<PageNotFound/>} />
          </Routes>
    </AppContainer>
    </div>
  );
}

export default App;
