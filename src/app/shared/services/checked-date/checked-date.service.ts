import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { HabitYear, IHabitYear } from '../../models/habit-year.model';
import { mockResponseFromServer } from './response.mock';
import { HabitDay } from '../../models/habit-day.model';
import { HabitMonth } from '../../models/habit-month.model';
import { HttpClient } from '@angular/common/http';
import { HabitCheck } from '../../models/habit-check.model';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
moment.locale('pt-BR');

@Injectable({
  providedIn: 'root'
})
export class CheckedDateService {

  checkedDatesCache: HabitYear[] = [];
  checkedDatesCache$ = new BehaviorSubject<HabitYear[]>([]);
  lastNavigatedDate: string;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(habitId: number, date: string) {
    this.httpClient.post<HabitCheck>('checks', {
      habitId,
      date
    }).subscribe(resp => {

    });
  }

  update(checkId: number) {
    this.httpClient.put<HabitCheck>(`checks`, {
      checkId
    }).subscribe(
      resp => {

      }
    );
  }

  private getDayFromServer(date: string) {
    // this.httpClient.get<IHabitYear>(`checks?date=${date}`).subscribe(
    //   resp => this.cache(resp)
    // );

    this.cache(mockResponseFromServer);
  }

  private getMonthFromServer(date: string) {
    // this.httpClient.get<IHabitYear>(`checks?date=${date}`).subscribe(
    //   resp => this.cache(resp)
    // );

    this.cache(mockResponseFromServer);
  }

  getHabitDayWithMoment(momentDate: moment.Moment): Observable<HabitDay> {
    if (!this.getDayFromCacheWithMoment(momentDate)) {
      this.getDayFromServer(momentDate.format('DD-MM-YYYY'));
    }

    return this.checkedDatesCache$.pipe(
      map(habitYears => {
        const year = habitYears.find(y => y.year === momentDate.year());
        const month = year && year.getMonth(momentDate.month() + 1);
        return month && month.getDay(momentDate.date());
      })
    );
  }

  getHabitDay(date: string): Observable<HabitDay> {
    return this.getHabitDayWithMoment(moment(date, 'DD-MM-YYYY'));
  }

  getHabitMonthWithMoment(momentDate: moment.Moment): Observable<HabitMonth> {
    if (!this.getMonthFromCacheWithMoment(momentDate)) {
      this.getMonthFromServer(momentDate.format('DD-MM-YYYY'));
    }

    return this.checkedDatesCache$.pipe(
      map(habitYears => {
        const year = habitYears.find(y => y.year === momentDate.year());
        return year && year.getMonth(momentDate.month() + 1);
      })
    );
  }

  getHabitMonth(date: string): Observable<HabitMonth> {
    return this.getHabitMonthWithMoment(moment(date, 'MM-YYYY'));
  }

  private cache(habitYearFromServer: IHabitYear) {
    const yearFromServer = this.json2habitYear(habitYearFromServer);
    const yearFromCache = this.getYearFromCache(yearFromServer.year);

    if (!yearFromCache) {
      this.checkedDatesCache.push(yearFromServer);
      this.checkedDatesCache$.next(this.checkedDatesCache);
      return;
    }

    yearFromServer.months.forEach(month => {
      const monthFromCache = this.getMonthFromCache(month.month, yearFromServer.year);

      if (!monthFromCache) {
        yearFromCache.months.push(month);
      } else {
        month.days.forEach(day => {
          const dayFromCache = this.getDayFromCache(day.day, month.month, yearFromServer.year);

          if (!dayFromCache) {
            monthFromCache.days.push(day);
          } else {
            monthFromCache.days = [...monthFromCache.days.filter(d => d.day !== day.day), day];
          }
        });
      }
    });

    this.checkedDatesCache$.next(this.checkedDatesCache);
  }

  private json2habitYear(habitYearJson: IHabitYear) {
    const mapDay = d => new HabitDay(d.day, d.habitChecks);
    const mapMonth = m => new HabitMonth(m.month, m.days.map(mapDay));
    const mapYear = y => new HabitYear(y.year, y.months.map(mapMonth));

    return mapYear(habitYearJson);
  }

  private getYearFromCache(year: number) {
    return this.checkedDatesCache && this.checkedDatesCache.find(y => y.year === year);
  }

  private getMonthFromCache(month: number, year: number) {
    const habitYear = this.getYearFromCache(year);

    return habitYear && habitYear.getMonth(month);
  }

  private getMonthFromCacheWithMoment(momenthDate: moment.Moment) {
    return this.getMonthFromCache(momenthDate.month() + 1, momenthDate.year());
  }

  private getDayFromCache(day: number, month: number, year: number) {
    const habitMonth = this.getMonthFromCache(month, year);

    return habitMonth && habitMonth.getDay(day);
  }

  private getDayFromCacheWithMoment(momentDate: moment.Moment) {
    return this.getDayFromCache(momentDate.date(), momentDate.month() + 1, momentDate.year());
  }

  isOneCheckedOnDate(date: string) {
    const momentDate = moment(date, 'DD-MM-YYYY');
    const habitDay = this.getDayFromCacheWithMoment(momentDate);
    return habitDay && habitDay.isOneChecked;
  }

  isAllCheckedOnDate(date: string) {
    const momentDate = moment(date, 'DD-MM-YYYY');
    const habitDay = this.getDayFromCacheWithMoment(momentDate);
    return habitDay && habitDay.isAllChecked;
  }
}
