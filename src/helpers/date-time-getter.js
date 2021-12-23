import { Timestamp } from "firebase/firestore";

export function getTimestamp() {
  return Timestamp.now();
}

export function getDateTime(timeStamp) {
  let dateTime = timeStamp.toDate();
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();

  return (
    day +
    "-" +
    month +
    "-" +
    year +
    " " +
    hour +
    ":" +
    (minute < 10 ? `0${minute}` : minute)
  );
}
