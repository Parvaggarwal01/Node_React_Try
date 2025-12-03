import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "../api/axiosClient";
import MoodForm from "../components/MoodForm";
import MoodList from "../components/MoodList";

const MoodPage = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    try {
      const response = await axios.get("/mood");
      setEntries(response.data);
    } catch (err) {
      console.error("Failed to fetch mood entries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to track your mood.</div>;
  }

  return (
    <div className="mood-page">
      <h1>Mood Tracker</h1>
      <div className="mood-content">
        <div className="card">
          <h2>Add New Entry</h2>
          <MoodForm onMoodSubmit={loadEntries} />
        </div>
        
        <div className="card">
          <h2>Your Mood History</h2>
          {loading ? (
            <p>Loading...</p>
          ) : entries.length > 0 ? (
            <MoodList entries={entries} showAll={true} />
          ) : (
            <p>No mood entries yet. Add your first entry above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodPage;