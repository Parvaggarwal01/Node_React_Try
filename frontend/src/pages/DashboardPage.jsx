import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "../api/axiosClient";
import MoodForm from "../components/MoodForm";
import MoodList from "../components/MoodList";

const DashboardPage = () => {
  const { user } = useAuth();
  const [recentMoods, setRecentMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMoods = async () => {
      try {
        const response = await axios.get("/mood");
        setRecentMoods(response.data.slice(0, 5)); // Get last 5 entries
      } catch (err) {
        console.error("Failed to fetch mood entries", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecentMoods();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1>Welcome back, {user.name}!</h1>
        <p>How are you feeling today?</p>
      </div>

      <div className="dashboard-content">
        <div className="card mood-card">
          <h2>Today's Mood</h2>
          <MoodForm onMoodSubmit={() => {
            // Refresh recent moods after submission
            axios.get("/mood").then(response => {
              setRecentMoods(response.data.slice(0, 5));
            });
          }} />
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/mood" className="btn btn-secondary">
              View Mood History
            </Link>
            <Link to="/resources" className="btn btn-secondary">
              Browse Resources
            </Link>
            <Link to="/support" className="btn btn-secondary">
              Get Support
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Recent Mood Entries</h2>
          {loading ? (
            <p>Loading...</p>
          ) : recentMoods.length > 0 ? (
            <MoodList entries={recentMoods} />
          ) : (
            <p>No mood entries yet. Start by adding your first entry!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;