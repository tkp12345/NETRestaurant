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
import Pharmacy from './components/category/Pharmacy';
import Bank from './components/category/Bank';
import Accommodation from './components/category/Accommodation';
import ConvenienceStore from './components/category/ConvenienceStore';

function App() {
  return (
    <div className="App">
          <Header/> 
          <Nav/>
          <Routes>
            <Route  path="/" element={<Main/>} />
            <Route  path="/food" element={<Food/>} />
            <Route  path="/coffee" element={<Coffee/>} />
            <Route  path="/pharmacy" element={<Pharmacy/>} />
            <Route  path="/convenience" element={<ConvenienceStore/>} />
            <Route  path="/bank" element={<Bank/>} />
            <Route  path="/accommodation" element={<Accommodation/>} />
            <Route element={<PageNotFound/>} />
          </Routes>
    </div>
  );
}

export default App;
