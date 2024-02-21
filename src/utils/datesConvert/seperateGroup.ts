const currentDate: Date = new Date();
currentDate.setUTCHours(0, 0, 0, 0);

export const determineGroup = (createdAt: string): string => {
  const createdDate: Date = new Date(createdAt);
  createdDate.setUTCHours(0, 0, 0, 0);

  const timeDiffMilliseconds = createdDate.getTime() - currentDate.getTime();
  const timeDiffDays = Math.ceil(timeDiffMilliseconds / (1000 * 60 * 60 * 24));

  if (timeDiffDays === 0) {
    return "Today";
  } else if (timeDiffDays === 1) {
    return "Tomorrow";
  } else {
    return formatDate(createdAt);
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", {month: "short"})
    .format(date)
    .toUpperCase();
  const year = date.getFullYear().toString();
  return `${day} ${month} ${year}`;
};
