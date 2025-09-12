import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import ScrollToTop from './components/ScrollToTop';
import AuthLayout from './components/AuthLayout';
import { AppContextProvider } from './ContextApi';
import Header from './components/Header';

// Helper to wrap a component inside AuthLayout
const withAuthLayout = (component: ReactElement) => (
  <AuthLayout>{component}</AuthLayout>
);

function App(): ReactElement {
  return (
    <AppContextProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Redirect from "/" to "/Dashboard" */}
          <Route path="/" element={<Navigate to="/Dashboard" replace />} />

          {/* Protected Routes with AuthLayout */}
          <Route
            path="/Dashboard"
            element={withAuthLayout(
              <Header title="Dashboard">
                <Dashboard />
              </Header>
            )}
          />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
