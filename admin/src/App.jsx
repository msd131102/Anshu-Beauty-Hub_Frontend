// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminNavbar from './components/AdminNavbar';
import LoginPage from './components/Login';
import AddItemPage from './components/AddItem';
import ListItemsPage from './components/ListItems';
import EditItemPage from './components/EditItem';
import OrdersPage from './components/Orders';
import UsersPage from './components/Users';
import ChangePasswordPage from './components/ChangePassword';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-grow bg-slate-50">
          <Routes>
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/add-item" element={<ProtectedRoute><AddItemPage /></ProtectedRoute>} />
            <Route path="/admin/list-items" element={<ProtectedRoute><ListItemsPage /></ProtectedRoute>} />
            <Route path="/admin/edit-item/:id" element={<ProtectedRoute><EditItemPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="/admin/change-password" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />
            {/* Redirect to list-items as default */}
            <Route path="*" element={<ProtectedRoute><ListItemsPage /></ProtectedRoute>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-emerald-800 text-white py-4">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm">
            <p>© {new Date().getFullYear()} ANSHU BEAUTY HUB Admin Panel. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;