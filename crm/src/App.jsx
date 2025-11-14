import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import { useWebSocket } from './hooks/useWebSocket';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import LeadList from './components/leads/LeadList';
import LeadDetails from './components/leads/LeadDetails';

function AppContent() {
  useWebSocket();

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<LeadList />} />
          <Route path="leads/:id" element={<LeadDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;