export const formatDate = (
  date: Date | string,
  format: string = "DD/MM/YYYY HH:mm:ss"
): string => {
  const d = new Date(date);

  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();

  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");

  const timezoneOffset = d.getTimezoneOffset();
  const sign = timezoneOffset > 0 ? "-" : "+";
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60))
    .toString()
    .padStart(2, "0");
  const offsetMinutes = Math.abs(timezoneOffset % 60)
    .toString()
    .padStart(2, "0");

  const timezone = `${sign}${offsetHours}:${offsetMinutes}`;

  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year.toString())
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds)
    .replace("ZZ", timezone);
};
