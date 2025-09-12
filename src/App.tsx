import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import ScrollToTop from './components/ScrollToTop';
// import SideBar from './components/SideBar';
import AuthLayout from './components/AuthLayout';
import { AppContextProvider } from './ContextApi';
import Header from './components/Header';


function App() {
  const withAuthLayout = (component) => (
    <AuthLayout>{component}</AuthLayout>
  );

  return (
    <AppContextProvider>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* Redirect from "/" to "/Dashboard" */}
          <Route path="/" element={<Navigate to="/Dashboard" replace />} />

          {/* Public Routes */}

          {/* Protected Routes with AuthLayout */}
          <Route
            path="/Dashboard"
            element={withAuthLayout(<Header title="Dashboard"><Dashboard /></Header>)}
          />
        </Routes>

      </Router>
     </AppContextProvider>
  );
}

export default App;
