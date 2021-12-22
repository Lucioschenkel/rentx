import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  diffInHours(start_date: Date, end_date: Date): number {
    const utcEndDate = this.toUTC(end_date);
    const utcStartDate = this.toUTC(start_date);

    return dayjs(utcEndDate).diff(utcStartDate, 'hours');
  }

  toUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  now(): Date {
    return dayjs().toDate();
  }

  diffInDays(start_date: Date, end_date: Date): number {
    const utcEndDate = this.toUTC(end_date);
    const utcStartDate = this.toUTC(start_date);

    return dayjs(utcEndDate).diff(utcStartDate, 'days');
  }
}
