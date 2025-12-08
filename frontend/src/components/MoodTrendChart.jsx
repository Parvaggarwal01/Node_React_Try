import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

const MoodTrendChart = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📈</div>
        <p>No mood data yet</p>
        <p>Start tracking to see your trends!</p>
      </div>
    );
  }

  // Prepare data for the last 30 days
  const getLast30DaysData = () => {
    const data = [];
    const today = startOfDay(new Date());

    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, "yyyy-MM-dd");

      // Find mood entries for this day
      const dayEntries = entries.filter((entry) => {
        const entryDate = format(new Date(entry.date), "yyyy-MM-dd");
        return entryDate === dateStr;
      });

      // Calculate average mood for the day
      const avgMood =
        dayEntries.length > 0
          ? dayEntries.reduce((sum, entry) => sum + entry.mood, 0) /
            dayEntries.length
          : null;

      data.push({
        date: format(date, "MMM dd"),
        fullDate: dateStr,
        mood: avgMood,
        entries: dayEntries.length,
      });
    }

    return data;
  };

  const data = getLast30DaysData();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-date">{data.fullDate}</p>
          {data.mood !== null ? (
            <>
              <p className="tooltip-mood">
                <strong>Mood:</strong> {data.mood.toFixed(1)} / 5.0
              </p>
              <p className="tooltip-entries">
                {data.entries} {data.entries === 1 ? "entry" : "entries"}
              </p>
            </>
          ) : (
            <p className="tooltip-no-data">No data</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mood-trend-chart">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#667eea"
            strokeWidth={3}
            fill="url(#moodGradient)"
            connectNulls
            dot={{ fill: "#667eea", r: 4 }}
            activeDot={{ r: 6, fill: "#764ba2" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTrendChart;
