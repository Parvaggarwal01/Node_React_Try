const MoodList = ({ entries, showAll = false }) => {
  if (!entries || entries.length === 0) {
    return <p>No mood entries recorded yet.</p>;
  }

  // If showAll is false, only show the first 5 entries
  const displayEntries = showAll ? entries : entries.slice(0, 5);

  const getMoodLabel = (mood) => {
    const labels = {
      1: "Very Low",
      2: "Low",
      3: "Neutral",
      4: "Good",
      5: "Very Good"
    };
    return labels[mood] || mood;
  };

  return (
    <div className="mood-list">
      {displayEntries.map((entry) => (
        <div key={entry._id} className="mood-entry">
          <div className="mood-header">
            <span className={`mood-badge mood-${entry.mood}`}>
              {entry.mood} - {getMoodLabel(entry.mood)}
            </span>
            <span className="mood-date">
              {new Date(entry.date).toLocaleDateString()}
            </span>
          </div>
          {entry.note && (
            <p className="mood-note">{entry.note}</p>
          )}
        </div>
      ))}
      {!showAll && entries.length > 5 && (
        <p className="more-entries">+ {entries.length - 5} more entries</p>
      )}
    </div>
  );
};

export default MoodList;