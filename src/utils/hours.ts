export const OPEN_HOUR = 8;  // 8 AM local time
export const CLOSE_HOUR = 20; // 8 PM local time (exclusive)

// Returns true if the provided date (default: now) is within operating hours
export function isWithinOperatingHours(date: Date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

export function getOperatingHoursLabel(): string {
  const format = (h: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:00 ${ampm}`;
  };
  return `${format(OPEN_HOUR)} - ${format(CLOSE_HOUR)}`;
}
