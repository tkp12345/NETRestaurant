import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import React, { Component } from 'react';
import PageNotFound from './page/PageNotFound'; 
import Main from './page/Main'; 
import Header from './layout/Header'; 
import Login from './layout/Login'; 
import AppContainer from './layout/AppContainer'; 
import styled from 'styled-components';
import Food from './components/category/Food';
import Coffee from './components/category/Coffee';
import Nav from './layout/Nav';

function App() {
  return (
    <div className="App">
          <Header/> 
          <Nav/>
          <Routes>
            <Route  path="/" element={<Main/>} />
            <Route  path="/food" element={<Food/>} />
            <Route  path="/coffee" element={<Coffee/>} />
            <Route element={<PageNotFound/>} />
          </Routes>
    </div>
  );
}

export default App;
