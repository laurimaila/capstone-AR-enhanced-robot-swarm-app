import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NoPage from './pages/NoPage';
import Header from './pages/Header';
import Main from './pages/Main';
import Settings from './pages/Settings';
import Footer from './pages/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/"/>
        <Route index element={<Main />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
      
    </BrowserRouter>
  );
}
