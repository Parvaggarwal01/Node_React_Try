import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const MoodStats = ({ entries }) => {
  const stats = useMemo(() => {
    if (!entries || entries.length === 0) {
      return {
        totalEntries: 0,
        avgMood: 0,
        currentStreak: 0,
        bestMood: 0,
        moodTrend: "neutral",
      };
    }

    const sortedEntries = [...entries].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    
    const calculateStreak = () => {
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = sortedEntries.length - 1; i >= 0; i--) {
        const entryDate = new Date(sortedEntries[i].date);
        entryDate.setHours(0, 0, 0, 0);
        const daysDiff = differenceInDays(today, entryDate);

        if (daysDiff === streak) {
          streak++;
        } else if (daysDiff > streak) {
          break;
        }
      }

      return streak;
    };

    
    const avgMood =
      entries.reduce((sum, e) => sum + e.mood, 0) / entries.length;

    
    const last7Days = entries.slice(-7);
    const previous7Days = entries.slice(-14, -7);

    let moodTrend = "neutral";
    if (last7Days.length > 0 && previous7Days.length > 0) {
      const avgLast7 =
        last7Days.reduce((sum, e) => sum + e.mood, 0) / last7Days.length;
      const avgPrev7 =
        previous7Days.reduce((sum, e) => sum + e.mood, 0) /
        previous7Days.length;

      if (avgLast7 > avgPrev7 + 0.3) moodTrend = "improving";
      else if (avgLast7 < avgPrev7 - 0.3) moodTrend = "declining";
    }

    
    const bestMood = Math.max(...entries.map((e) => e.mood));

    return {
      totalEntries: entries.length,
      avgMood: avgMood.toFixed(1),
      currentStreak: calculateStreak(),
      bestMood,
      moodTrend,
    };
  }, [entries]);

  const getTrendIcon = (trend) => {
    if (trend === "improving") return "📈";
    if (trend === "declining") return "📉";
    return "➡️";
  };

  const getTrendColor = (trend) => {
    if (trend === "improving") return "#43e97b";
    if (trend === "declining") return "#ff6b6b";
    return "#4facfe";
  };

  const getMoodEmoji = (avg) => {
    const num = parseFloat(avg);
    if (num >= 4.5) return "😄";
    if (num >= 3.5) return "🙂";
    if (num >= 2.5) return "😐";
    if (num >= 1.5) return "😟";
    return "😢";
  };

  return (
    <div className="mood-stats">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <div className="stat-value">{stats.totalEntries}</div>
          <div className="stat-label">Total Entries</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">{getMoodEmoji(stats.avgMood)}</div>
        <div className="stat-content">
          <div className="stat-value">{stats.avgMood} / 5.0</div>
          <div className="stat-label">Average Mood</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🔥</div>
        <div className="stat-content">
          <div className="stat-value">
            {stats.currentStreak} {stats.currentStreak === 1 ? "day" : "days"}
          </div>
          <div className="stat-label">Current Streak</div>
        </div>
      </div>

      <div className="stat-card">
        <div
          className="stat-icon"
          style={{ color: getTrendColor(stats.moodTrend) }}
        >
          {getTrendIcon(stats.moodTrend)}
        </div>
        <div className="stat-content">
          <div className="stat-value" style={{ textTransform: "capitalize" }}>
            {stats.moodTrend}
          </div>
          <div className="stat-label">7-Day Trend</div>
        </div>
      </div>
    </div>
  );
};

export default MoodStats;
