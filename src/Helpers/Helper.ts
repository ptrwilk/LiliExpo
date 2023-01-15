export const toHoursMinutesSeconds = (totalSeconds: number) => {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours: hours, minutes: minutes, seconds: seconds };
};

export const toTotalSeconds = (
  hours: number,
  minutes: number,
  second: number
) => {
  return second + minutes * 60 + hours * 60 * 60;
};

export const isEmptyOrUndefined = (value: string) =>
  value === undefined || value === "";
