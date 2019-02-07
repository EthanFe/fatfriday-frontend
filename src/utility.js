const today = () => {
  const date = new Date()
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
}

module.exports = {today}