import React, { useMemo } from 'react';

const generateCalendarGrid = (daysToShow) => {
  const today = new Date();
  // 1. Find out what day of the week today is (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const todayDayOfWeek = today.getDay();

  // 2. Generate an array for the dates
  const daysArray = [];

  // 3. Loop backwards to generate actual dates
  for (let i = daysToShow - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    // Format as YYYY-MM-DD to easily match with your backend data
    // Use local date parts to prevent timezone shifting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    daysArray.push({
      date: dateString,
      dayOfWeek: date.getDay(),
      count: 0 // Default to 0, later merged with backend data
    });
  }

  // 4. Pad the BEGINNING so the first square aligns with the correct day of the week
  const firstDateDay = daysArray[0].dayOfWeek;
  const prefixBlanks = Array.from({ length: firstDateDay }).map(() => ({
    isBlank: true,
  }));

  // Combine blanks + actual days
  return [...prefixBlanks, ...daysArray];
};

const ActivityHeatmap = ({ days = 21, data = [] }) => {
  // Generate the grid structure
  const calendarGrid = useMemo(() => generateCalendarGrid(days), [days]);

  // Merge backend data with our grid
  const mergedGrid = useMemo(() => {
    return calendarGrid.map(day => {
      if (day.isBlank) return day;
      const activity = data.find(b => b.date === day.date);
      return { ...day, count: activity ? activity.count : 0 };
    });
  }, [calendarGrid, data]);

  return (
    <div className="overflow-x-auto pb-2 custom-scrollbar">
      <div className="grid grid-cols-7 gap-1.5 mt-2 min-w-[200px]">
        {/* Day Headers */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={`header-${i}`} className="text-center font-label-sm text-[10px] text-on-surface-variant mb-1">
            {day}
          </div>
        ))}

        {mergedGrid.map((day, index) => {
          if (day.isBlank) {
            // Render an invisible square to maintain grid alignment
            return <div key={`blank-${index}`} className="aspect-square bg-transparent"></div>;
          }

          // Determine color based on submission count using Stitch mockup styles
          let bgColor = 'bg-surface-variant/40';
          let textColor = 'text-on-surface-variant';
          let extraClasses = '';

          if (day.count > 0 && day.count <= 1) {
            bgColor = 'bg-primary/20';
            textColor = 'text-primary';
          } else if (day.count > 1 && day.count <= 2) {
            bgColor = 'bg-primary/40';
            textColor = 'text-primary';
          } else if (day.count > 2 && day.count <= 3) {
            bgColor = 'bg-primary/60';
            textColor = 'text-background';
          } else if (day.count > 3) {
            bgColor = 'bg-primary shadow-[0_0_8px_rgba(206,189,255,0.5)] border border-primary';
            textColor = 'text-background font-bold';
          }

          // In the mockup, there are dashed borders for future days, but we only have past days.
          // Let's assume day.count == 0 is just bg-surface-variant/40.

          return (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} submissions`}
              className={`aspect-square flex items-center justify-center text-[10px] rounded-full transition-all cursor-pointer ${bgColor} ${textColor} ${extraClasses}`}
            >
              {parseInt(day.date.split('-')[2])}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityHeatmap;
