import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClientDashboard from './pages/ClientDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AddServicePage from './pages/AddServicePage';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar 
            isAuthenticated={isAuthenticated} 
            userRole={userRole}
            onLogout={handleLogout}
          />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/service/:id" element={<ServiceDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/add-service" element={<AddServicePage />} />
              <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} 
              />
              <Route 
                path="/register" 
                element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} 
              />
              <Route 
                path="/dashboard/client" 
                element={isAuthenticated && userRole === 'client' ? <ClientDashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dashboard/provider" 
                element={isAuthenticated && userRole === 'provider' ? <ProviderDashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/profile" 
                element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
