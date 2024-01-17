export const durationToMinutes = (duration) => {
  const parts = duration.split(":");
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
};
