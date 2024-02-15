import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AttemptedBorrows from './components/AttemptedBorrows';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/attempts" element={<AttemptedBorrows />} />
        {/* Add a default route (optional) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
