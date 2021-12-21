function getDateTime() {
  let todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const day = todayDate.getDate();
  const hour = todayDate.getHours();
  const minute = todayDate.getMinutes();

  return day + "-" + month + "-" + year + " " + hour + ":" + minute;
}

export default getDateTime;
