const numberFormatter = new Intl.NumberFormat("en-US");

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Bangkok",
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatDateTime(isoDate: string): string {
  return `${dateTimeFormatter.format(new Date(isoDate)).replace(",", "")} น.`;
}