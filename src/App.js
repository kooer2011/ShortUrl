import { useState } from 'react';
import { Typography, AppBar, Toolbar, Box, Button, Grid } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import Input from './Input';
import Redirect from './Redirect';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/:slug" element={<Redirect />} />
      </Routes>
    </div>
  );
}
export default App;
