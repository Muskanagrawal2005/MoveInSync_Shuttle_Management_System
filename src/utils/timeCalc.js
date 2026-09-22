// 6 AM to 10 PM
export const TIMELINE_START_HOUR = 6;
export const TIMELINE_END_HOUR = 22;

export const TOTAL_MINUTES = (TIMELINE_END_HOUR - TIMELINE_START_HOUR) * 60;

// 24 hour time string to total minutes
export const timeToMinutes = (timeStr) => {
  if (!timeStr || !timeStr.includes(':')) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// minutes from midnight back to 24 hour format 
export const minutesToTimeStr = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}`;
};

// calculate css percentage for any timeline block
export const getTimelinePosition = (startTimeStr, endTimeStr) => {
  const startMin = timeToMinutes(startTimeStr);
  const endMin = timeToMinutes(endTimeStr);

  const timelineStartMin = TIMELINE_START_HOUR * 60; 
  const timelineEndMin = TIMELINE_END_HOUR * 60;     

  // Clamp the interval to the visible timeline range
  const clampedStart = Math.max(startMin, timelineStartMin);
  const clampedEnd = Math.min(endMin, timelineEndMin);

  // If the block falls completely outside the window or has zero duration
  if (clampedEnd <= clampedStart) {
    return { left: '0%', width: '0%', isVisible: false };
  }

  // Calculate percentage relative to the 960-minute duration
  const leftPercent = ((clampedStart - timelineStartMin) / TOTAL_MINUTES) * 100;
  const widthPercent = ((clampedEnd - clampedStart) / TOTAL_MINUTES) * 100;

  return {
    left: `${leftPercent.toFixed(2)}%`,
    width: `${widthPercent.toFixed(2)}%`,
    isVisible: true,
  };
};


// Time interval overlap
export const checkTimeOverlap = (start1, end1, start2, end2) => {
  const s1 = timeToMinutes(start1);
  const e1 = timeToMinutes(end1);
  const s2 = timeToMinutes(start2);
  const e2 = timeToMinutes(end2);

  return Math.max(s1, s2) < Math.min(e1, e2);
};