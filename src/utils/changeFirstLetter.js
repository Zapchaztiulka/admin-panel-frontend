export const changeFirstLetter = (name, surname) => {
  const string = `${name} ${surname}`;
  return string
    .toLowerCase()
    .split(" ")
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join(" ")
    .split("-")
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join("-");
};
