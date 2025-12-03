import { useState } from "react";
import axios from "../api/axiosClient";

const MoodForm = ({ onMoodSubmit }) => {
  const [mood, setMood] = useState(3);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/mood", { mood: Number(mood), note });
      setNote("");
      if (onMoodSubmit) onMoodSubmit();
    } catch (err) {
      console.error("Failed to save mood entry", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <div className="mood-selector">
        <label>
          How are you feeling today?
          <div className="mood-options">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="mood-option">
                <input
                  type="radio"
                  name="mood"
                  value={value}
                  checked={Number(mood) === value}
                  onChange={() => setMood(value)}
                />
                <span className="mood-label">{value}</span>
              </label>
            ))}
          </div>
        </label>
      </div>
      
      <div className="form-group">
        <label htmlFor="note">Note (optional)</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any thoughts or feelings you'd like to record..."
        />
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Save Mood Entry"}
      </button>
    </form>
  );
};

export default MoodForm;