import React, { useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './pages/SearchResults';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  


  return (
    

<>
<Provider store={store}>
<BrowserRouter>
  
  <Routes>
    <Route path="/" element={<Home page="Homepage"/>} />
    
    <Route path="/risultati" element={<SearchResults />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  
</BrowserRouter>
</Provider>
</>
  )
}

export default App
