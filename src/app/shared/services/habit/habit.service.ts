import { Injectable } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { HttpClient } from '@angular/common/http';
import { mockResponseFromServer } from './response.mock';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import { CheckedDateService } from '../checked-date/checked-date.service';
import * as moment from 'moment';
import { HabitWithDayInfo } from '../../models/habit-with-day-info';
import { combineLatest, map } from 'rxjs/operators';
import { DateCircleInfo } from '../../models/date-circle-info.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  habits: Habit[] = null;
  habits$ = new BehaviorSubject<Habit[]>(null);

  constructor(
    private http: HttpClient,
    private checkedDateService: CheckedDateService
  ) {}

  getHabitsFromServer() {
    // this.http.get<Habit[]>('habits').subscribe(
    //   resp => {
    //     this.cache(resp)
    //   }
    // );

    this.cache(mockResponseFromServer);
  }

  getHabits(): Observable<Habit[]> {
    if (this.habits === null) {
      this.getHabitsFromServer();
    }

    return this.habits$;
  }

  private cache(resp: Habit[]) {
    this.habits = resp;
    this.habits$.next(this.habits);
  }

  formatHabitName(name: string) {
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const lowerCase = (str: string) => str.toLowerCase();
    const replaceStringsWithDash = (str: string) => str.replace(/\s/g, '-');

    return replaceStringsWithDash(lowerCase(normalize(name)));
  }

  getHabitWithFormattedName(formattedName: string) {
    return {...this.habits.find(habit => {
      return this.formatHabitName(habit.name) === formattedName;
    })};
  }

  getHabitsWithDayInfo(momentDate: moment.Moment): Observable<HabitWithDayInfo[]> {
    return this.getHabits()
      .pipe(
        combineLatest(
          this.checkedDateService.getHabitDayWithMoment(momentDate),
          (habits, habitDay) => {
            if (!habits) {
              return [];
            }

            return habits.map(habit => {
                const check = habitDay && habitDay.getCheckForHabitWithId(habit.id);
                const isChecked = check && check.isChecked || false;
                const streak = check && check.streak || 0;
                const checkId = check && check.id || null;
                const habitWithDayInfo: HabitWithDayInfo = {
                  ...habit,
                  isChecked,
                  streak,
                  checkId
                };
                return habitWithDayInfo;
            }).filter(
              habit => habit.weekdays.includes(momentDate.weekday())
                && moment(habit.creationDate, 'DD-MM-YYYY').isSameOrBefore(momentDate)
            ).sort(
              (a, b) => {
                if (a.isChecked && !b.isChecked) {
                  return 1;
                }

                if (!a.isChecked && b.isChecked) {
                  return -1;
                }

                if (moment(a.creationDate, 'DD-MM-YYYY').isBefore(moment(a.creationDate, 'DD-MM-YYYY'))) {
                  return -1;
                }

                if (moment(a.creationDate, 'DD-MM-YYYY').isAfter(moment(a.creationDate, 'DD-MM-YYYY'))) {
                  return 1;
                }

                return  0;
              }
            );
        })
    );
  }

  getDateCircleInfo(momentDate: moment.Moment): DateCircleInfo {
    return {
      date: momentDate.format('DD-MM-YYYY'),
      checks$: this.getHabitsWithDayInfo(momentDate)
        .pipe(
          map(h => h.reduce((res, cur) => ({
            isOneChecked: res.isOneChecked || cur.isChecked,
            isAllChecked: res.isAllChecked && cur.isChecked
          }),
          {isOneChecked: false, isAllChecked: true}
        )))
    };
  }
}
