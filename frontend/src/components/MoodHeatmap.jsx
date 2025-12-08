import { format, startOfWeek, addDays, subWeeks, isSameDay } from "date-fns";

const MoodHeatmap = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🗓️</div>
        <p>No mood data yet</p>
        <p>Track your mood to see patterns!</p>
      </div>
    );
  }

  // Get the last 12 weeks of data
  const getHeatmapData = () => {
    const weeks = [];
    const today = new Date();

    for (let i = 11; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(today, i), { weekStartsOn: 1 }); // Start on Monday
      const week = [];

      for (let j = 0; j < 7; j++) {
        const day = addDays(weekStart, j);
        const dayEntries = entries.filter((entry) =>
          isSameDay(new Date(entry.date), day)
        );

        const avgMood =
          dayEntries.length > 0
            ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) /
              dayEntries.length
            : null;

        week.push({
          date: day,
          mood: avgMood,
          count: dayEntries.length,
        });
      }

      weeks.push(week);
    }

    return weeks;
  };

  const getMoodColor = (mood) => {
    if (mood === null) return "#f5f5f5";
    if (mood >= 4.5) return "#43e97b"; // Great
    if (mood >= 3.5) return "#4facfe"; // Good
    if (mood >= 2.5) return "#ffa502"; // Okay
    if (mood >= 1.5) return "#ff6b6b"; // Sad
    return "#ee5a6f"; // Very Sad
  };

  const getMoodEmoji = (mood) => {
    if (mood === null) return "";
    if (mood >= 4.5) return "😄";
    if (mood >= 3.5) return "🙂";
    if (mood >= 2.5) return "😐";
    if (mood >= 1.5) return "😟";
    return "😢";
  };

  const weeks = getHeatmapData();
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="mood-heatmap">
      <div className="heatmap-container">
        <div className="heatmap-days">
          {dayLabels.map((day) => (
            <div key={day} className="day-label">
              {day}
            </div>
          ))}
        </div>
        <div className="heatmap-grid">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-week">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="heatmap-cell"
                  style={{ backgroundColor: getMoodColor(day.mood) }}
                  title={`${format(day.date, "MMM dd, yyyy")}\n${
                    day.mood !== null
                      ? `Mood: ${day.mood.toFixed(1)} (${day.count} ${
                          day.count === 1 ? "entry" : "entries"
                        })`
                      : "No data"
                  }`}
                >
                  {day.mood !== null && (
                    <span className="heatmap-emoji">
                      {getMoodEmoji(day.mood)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="heatmap-legend">
        <span className="legend-label">Mood Scale:</span>
        <div className="legend-items">
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#ee5a6f" }}
            ></div>
            <span>😢 Very Sad</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#ff6b6b" }}
            ></div>
            <span>😟 Sad</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#ffa502" }}
            ></div>
            <span>😐 Okay</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#4facfe" }}
            ></div>
            <span>🙂 Good</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: "#43e97b" }}
            ></div>
            <span>😄 Great</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodHeatmap;
