import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { HabitYear } from '../../models/habit-year.model';
import { response } from './response.mock';
import { HabitDay } from '../../models/habit-day.model';
import { HabitMonth } from '../../models/habit-month.model';
moment.locale('pt-BR');

@Injectable({
  providedIn: 'root'
})
export class CheckedDateService {

  checkedDatesCache: HabitYear[] = [];
  lastNavigatedDate: string;

  constructor() {
    const mapDays = d => new HabitDay(d.day, d.checks);
    const mapMonths = m => new HabitMonth(m.month, m.days.map(mapDays));
    const mapYears = y => new HabitYear(y.year, y.months.map(mapMonths));

    const mapped = response.map(mapYears);

    this.checkedDatesCache = mapped;
  }

  getYear(year: number) {
    return this.checkedDatesCache && this.checkedDatesCache.find(y => y.year === year);
  }

  getMonth(month: number, year: number) {
    const habitYear = this.getYear(year);

    return habitYear && habitYear.getMonth(month);
  }

  getDay(day: number, month: number, year: number) {
    const habitMonth = this.getMonth(month, year);

    return habitMonth && habitMonth.getDay(day);
  }

  getHabitDayFromMomentDate(momentDate: moment.Moment) {
    return this.getDay(momentDate.date(), momentDate.month() + 1, momentDate.year());
  }

  getNumberOfPerfectDaysOnMonth(momentDate: moment.Moment) {
    const habitMonth = this.getMonth(momentDate.month() + 1, momentDate.year());
    return habitMonth && habitMonth.getNumberOfPerfectDays() || 0;
  }

  isOneCheckedOnDate(date: string) {
    const momentDate = moment(date, 'DD-MM-YYYY');
    const habitDay = this.getHabitDayFromMomentDate(momentDate);
    return habitDay && habitDay.isOneChecked;
  }

  isAllCheckedOnDate(date: string) {
    const momentDate = moment(date, 'DD-MM-YYYY');
    const habitDay = this.getHabitDayFromMomentDate(momentDate);
    return habitDay && habitDay.isAllChecked;
  }
}
