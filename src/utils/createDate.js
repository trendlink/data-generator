export function generateRandomDate(from, to) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime()),
  ).toLocaleDateString();
}

export function randomDate(start, end) {
  let d = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    ),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}
