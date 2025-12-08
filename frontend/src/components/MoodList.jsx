const MoodList = ({ entries, showAll = false }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📊</div>
        <p>No mood entries recorded yet.</p>
        <p>Start tracking your emotional wellbeing today!</p>
      </div>
    );
  }

  // If showAll is false, only show the first 5 entries
  const displayEntries = showAll ? entries : entries.slice(0, 5);

  const getMoodData = (mood) => {
    const moodMap = {
      1: { emoji: "😢", label: "Very Sad", color: "#ff6b6b" },
      2: { emoji: "😟", label: "Sad", color: "#ffa502" },
      3: { emoji: "😐", label: "Okay", color: "#4facfe" },
      4: { emoji: "🙂", label: "Good", color: "#43e97b" },
      5: { emoji: "😄", label: "Great", color: "#f093fb" },
    };
    return moodMap[mood] || { emoji: "😐", label: "Unknown", color: "#gray" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="mood-list">
      {displayEntries.map((entry) => {
        const moodData = getMoodData(entry.mood);
        return (
          <div key={entry._id} className="mood-entry">
            <div className="mood-header">
              <span className={`mood-badge mood-${entry.mood}`}>
                <span style={{ fontSize: "1.2rem" }}>{moodData.emoji}</span>
                {moodData.label}
              </span>
              <span className="mood-date">{formatDate(entry.date)}</span>
            </div>
            {entry.note && <p className="mood-note">💭 {entry.note}</p>}
          </div>
        );
      })}
      {!showAll && entries.length > 5 && (
        <p className="more-entries">
          📈 {entries.length - 5} more{" "}
          {entries.length - 5 === 1 ? "entry" : "entries"} available
        </p>
      )}
    </div>
  );
};

export default MoodList;
