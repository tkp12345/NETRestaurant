import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import React, { Component } from 'react';
import PageNotFound from './layout/PageNotFound'; 
import Main from './layout/Main'; 
import Header from './layout/Header'; 

function App() {
  return (
    <div className="App">
          <Header/> 
          <Routes>
            <Route  path="/" element={<Main/>} />
            {/* <Route path="/a" element={a} /> */}
            {/* <Route path="/b" element={b} /> */}
            <Route element={<PageNotFound/>} />
          </Routes>
    </div>
  );
}

export default App;
