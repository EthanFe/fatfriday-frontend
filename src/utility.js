const today = () => {
  const date = new Date()
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
}

const index = (array, key) => {
  return array.reduce( (object, element) => {
    object[element[key]] = element
    return object
    // eslint-disable-next-line
  }, new Object)
}

module.exports = {today, index}