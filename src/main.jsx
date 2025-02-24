import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserDetailsProvider } from './contexts/UserContext.jsx';
import { LoginProvider } from './contexts/LoginContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { OrderProvider } from './contexts/OrderContext.jsx';

// Custom logging to monitor component mounts and renders

ReactDOM.createRoot(document.getElementById('root')).render(
  // Disable StrictMode temporarily to check if this resolves double mounting
  // <React.StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <LoginProvider>
          <UserDetailsProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </UserDetailsProvider>
        </LoginProvider>
      </OrderProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

