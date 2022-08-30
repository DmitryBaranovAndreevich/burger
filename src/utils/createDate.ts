export const createDate = (createdAt: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const date = new Date(createdAt);

  const setDay = (date: Date) => {
    switch (today.getDay() - date.getDay()) {
      case 0:
        return "Сегодня";

      case 1 || -6:
        return "Вчера";

      default:
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }
  };
  const day = setDay(date);
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();

  const time = `${hours} : ${minutes}`;

  return `${day}, ${time} i-GTM+${date.getTimezoneOffset() / -60}`;
};
