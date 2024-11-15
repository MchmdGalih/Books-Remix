export const showFormattedDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("id-ID", options);
};
