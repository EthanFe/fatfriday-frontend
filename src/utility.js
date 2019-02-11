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

const group = (array, key) => {
  return array.reduce( (object, element) => {
    // eslint-disable-next-line
    object[element[key]] = object[element[key]] || new Array
    object[element[key]].push(element)
    return object
    // eslint-disable-next-line
  }, new Object)
}

module.exports = {today, index, group}