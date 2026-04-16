/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Residents from './pages/Residents';
import Payments from './pages/Payments';
import Rooms from './pages/Rooms';
import Profile from './pages/Profile';
import ResidentDetail from './pages/ResidentDetail';
import Receipt from './pages/Receipt';
import Complaints from './pages/Complaints';
import Onboard from './pages/Onboard';
import Notifications from './pages/Notifications';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/residents/:id" element={<ResidentDetail />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/receipt/:id" element={<Receipt />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
