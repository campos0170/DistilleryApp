// src/components/Layout.jsx
// Layout.jsx
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

export default function Layout({ token, onLogout }) {
  return (
    <div className="layout">
      <nav className="nav-bar">
        <h2>Whiskey Collection</h2>
        <div>
          <Link to="/">Home</Link>
          {!token ? (
            <>
              {" | "}
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              {" | "}
              <Link to="/dashboard">Dashboard</Link>
              {" | "}
              <button
                onClick={onLogout}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
