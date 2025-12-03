import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          MindWell
        </Link>
        
        <ul className="nav-menu">
          {user ? (
            <>
              {user.role === "student" ? (
                <>
                  <li>
                    <Link 
                      to="/dashboard" 
                      className={isActive("/dashboard") ? "nav-link active" : "nav-link"}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/mood" 
                      className={isActive("/mood") ? "nav-link active" : "nav-link"}
                    >
                      Mood Tracker
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/resources" 
                      className={isActive("/resources") ? "nav-link active" : "nav-link"}
                    >
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/support" 
                      className={isActive("/support") ? "nav-link active" : "nav-link"}
                    >
                      Get Support
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/admin" 
                    className={isActive("/admin") ? "nav-link active" : "nav-link"}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button onClick={logout} className="btn btn-link">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className={isActive("/login") ? "nav-link active" : "nav-link"}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={isActive("/register") ? "nav-link active" : "nav-link"}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;