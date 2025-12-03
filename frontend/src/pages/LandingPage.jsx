import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Mental Health Support Platform</h1>
          <p className="hero-subtitle">
            Your well-being matters. Track your mood, access resources, and get support when you need it.
          </p>
          {!user ? (
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          ) : (
            <div className="cta-buttons">
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Mood Tracking</h3>
              <p>Monitor your emotional well-being with our simple daily mood tracker.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Resources</h3>
              <p>Access curated articles, videos, and guides on mental health topics.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Get Support</h3>
              <p>Reach out for help when you need it with our confidential support system.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer-section">
        <div className="container">
          <div className="disclaimer-box">
            <h3>Important Disclaimer</h3>
            <p>
              This platform does not replace professional medical or emergency services. 
              In an emergency, contact your local emergency number or campus helpline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;