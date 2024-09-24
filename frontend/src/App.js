import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Explore from './pages/Explore';
import Error404 from './pages/Error404';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import './App.css'
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileDetail from './pages/ProfileDetail';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route Route path='/' element={<Home />}></Route>
        <Route Route path='/aboutus' element={<AboutUs />}></Route>
        <Route Route path='/explore' element={<Explore />}></Route>
        <Route path="/profile/:id" element={<ProfileDetail />} /> 
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />


        <Route Route path='*' element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

