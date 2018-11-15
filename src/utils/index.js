export function getTomorowDateString(delimiter = '-') {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const day = currentDate.getDate(),
        month = currentDate.getMonth() + 1, // returns month index
        year = currentDate.getFullYear();

  return [day, month, year].join(delimiter);
}