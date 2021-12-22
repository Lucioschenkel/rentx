export interface IDateProvider {
  diffInHours(start_date: Date, end_date: Date): number;
  toUTC(date: Date): string;
  now(): Date;
  diffInDays(start_date: Date, end_date: Date): number;
}
