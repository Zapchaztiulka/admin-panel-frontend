import { format, parseISO, fromUnixTime } from "date-fns";
import ukLocale from "date-fns/locale/uk";

export const formatDate = (date) => {
  if (typeof date === "number") {
    const dateObject = fromUnixTime(date / 1000);
    if (isNaN(dateObject)) {
      return "Invalid Date";
    }
    return format(dateObject, "HH:mm", {
      locale: ukLocale,
    });
  } else if (typeof date === "string") {
    const parsedDate = parseISO(date);

    if (isNaN(parsedDate)) {
      return "Invalid Date";
    }

    return format(parsedDate, "HH:mm", {
      locale: ukLocale,
    });
  } else {
    return "Invalid Date";
  }
};


  export const formatDateForPrice = (dateString) => {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    const formattedDate = day + '.' + month + '.' + year;
    return formattedDate;
  };