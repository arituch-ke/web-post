import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: string) => {
  return dayjs(date).format("dddd, MMMM D, YYYY, HH:mm");
};

export const currentTimezone = dayjs.tz.guess();
