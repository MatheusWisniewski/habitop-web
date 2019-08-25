import { Injectable } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { API_URL, DATE_FORMAT, MONTH_DATE_FORMAT } from '../../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CheckedDate } from '../../models/checked-date.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  lastNavigatedDate: string;
  habits: Habit[] = [];
  habits$ = new BehaviorSubject<Habit[]>(null);

  USER_RESOURCE_URL = () => API_URL + 'users/' + localStorage.getItem('user_id') + '/habits/';

  HABIT_RESOURCE_URL = () => API_URL + 'habits/';

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  broadcast() {
    this.habits$.next(this.habits);
  }

  setHabitsFromServer(resp) {
    this.cache(resp);
  }

  getHabits(): Observable<Habit[]> {
    return this.habits$;
  }

  createHabit(name: string, icon: string, color: string, weekdays: number[]) {
    return this.httpClient.post(this.USER_RESOURCE_URL(),
        {
          name,
          icon,
          color,
          weekdays
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    ).subscribe(
        (resp: any) => {
          this.habits.push(resp);
          this.habits$.next(this.habits);
          this.snackBar.open(`Hábito '${name}' criado com sucesso!`);
          this.router.navigateByUrl(this.lastNavigatedDate);
        },
        err => {
          this.snackBar.open(err.error);
        }
      );
  }

  updateHabit(habit: Habit) {
    return this.httpClient.put(this.HABIT_RESOURCE_URL() + habit.id,
      habit,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).subscribe(
        (resp: Habit) => {
          const previousCheckedDates = this.habits.find(h => h.id === habit.id).checkedDates;
          resp.checkedDates = previousCheckedDates;
          this.habits = this.habits.filter(h => h.id !== habit.id);
          this.habits.push(resp);
          this.habits$.next(this.habits);
          this.snackBar.open(`Hábito '${habit.name}' atualizado com sucesso!`);
          this.router.navigateByUrl(this.lastNavigatedDate);
        },
        err => {
          this.snackBar.open(err.error);
        }
      );
  }

  deleteHabit(habit: Habit) {
    return this.httpClient.delete(this.HABIT_RESOURCE_URL() + habit.id,
      {
        headers: {
          'Response-Type': 'blob'
        }
      }
    ).subscribe(
        (resp: any) => {
          this.habits = this.habits.filter(h => h.id !== habit.id);
          this.habits$.next(this.habits);
          this.snackBar.open(`Hábito deletado com sucesso!`);
          this.router.navigateByUrl(this.lastNavigatedDate);
        },
        err => {
          this.snackBar.open(err.error);
        }
      );
  }

  private cache(resp: Habit[]) {
    this.habits = resp;
    this.broadcast();
  }

  formatHabitName(name: string) {
    const normalize = (str: string) => str && str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const lowerCase = (str: string) => str && str.toLowerCase();
    const replaceStringsWithDash = (str: string) => str && str.replace(/\s/g, '-');

    return replaceStringsWithDash(lowerCase(normalize(name)));
  }

  getHabitWithFormattedName(formattedName: string): Observable<Habit> {

    if (!formattedName) {
      return of(null);
    }

    const findFunction = habit => {
      return this.formatHabitName(habit.name) === formattedName;
    };

    if (this.habits !== null) {
      return of({...this.habits.find(findFunction)});
    }

    return this.habits$.pipe(
      map(habits => {
        return habits === null ? undefined : {...habits.find(findFunction)};
      })
    );
  }

  getCheckedDate(habit: Habit, date: string): Observable<CheckedDate> {

    return this.habits$.pipe(
      map(
        habits => {
          const habitFromCache = habits && habits.find(h => h.id === habit.id);

          if (!habitFromCache) {
            return null;
          }

          const checkedDate: CheckedDate = habitFromCache.checkedDates
            && habitFromCache.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date);

          const momentDate = moment(date, DATE_FORMAT);
          const weekday = momentDate.weekday();
          const weekdayIndex = habit.weekdays.sort().indexOf(weekday);

          if (weekdayIndex === -1) {
            return null;
          }

          const previousWeekdayIndex = weekdayIndex === 0 ? habit.weekdays.length - 1 : weekdayIndex - 1;
          const previousWeekday = habit.weekdays.sort()[previousWeekdayIndex];
          const previousDate = momentDate.clone().subtract(1, 'day');

          while (previousDate.weekday() !== previousWeekday) {
            previousDate.subtract(1, 'day');
          }

          const previousCheckedDate: CheckedDate = habit.checkedDates
            && habit.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === previousDate.format(DATE_FORMAT));

          if (!previousCheckedDate) {
            if (checkedDate) {
              return checkedDate;
            }
            return {
              id: null,
              date,
              isChecked: false,
              streak: 0,
              habitId: habit.id,
              previousId: null
            };
          }

          if (checkedDate) {
            return {
              ...checkedDate
            };
          }

          return {
            id: null,
            date,
            isChecked: false,
            streak: previousCheckedDate.isChecked ? previousCheckedDate.streak : 0,
            habitId: habit.id,
            previousId: previousCheckedDate.id
          };
        }
      )
    );
  }

  getHabitsThatHappenOnDate(date) {
    const momentDate = moment(date, DATE_FORMAT);
    const weekday = momentDate.weekday();

    return this.habits$.pipe(
      map(
        habits => this.habits.filter(h => h.weekdays.includes(weekday))
          .sort((a, b) => {
            const aIsChecked = a.checkedDates
              && a.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date)
              && a.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date).isChecked;

            const bIsChecked = b.checkedDates
              && b.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date)
              && b.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date).isChecked;

            if (aIsChecked && !bIsChecked) {
              return 1;
            }

            if (!aIsChecked && bIsChecked) {
              return -1;
            }

            return 0;
          })
      )
    );
  }

  isOneCheckedOnDate(date: string) {
    const momentDate = moment(date, DATE_FORMAT);
    const weekday = momentDate.weekday();

    return this.habits && this.habits.reduce((acc, cur) => {
      return acc
        || (cur.weekdays.includes(weekday)
        && cur.checkedDates
        && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date)
        && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date).isChecked);
    }, false);
  }

  isAllCheckedOnDate(date: string) {
    const momentDate = moment(date, DATE_FORMAT);
    const weekday = momentDate.weekday();

    return this.habits.reduce((acc, cur) => {
      if (!cur.weekdays.includes(weekday)) {
        return acc;
      }

      return acc
        && cur.checkedDates
        && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date)
        && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date).isChecked;
    }, true);
  }

  isOneCheckedOnDate$(date: string) {
    const momentDate = moment(date, DATE_FORMAT);
    const weekday = momentDate.weekday();

    return this.habits$.pipe(
      map(
        habits => {
          return habits && habits.reduce((acc, cur) => {
            return acc
              || (cur.weekdays.includes(weekday)
              && cur.checkedDates
              && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date)
              && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date).isChecked);
          }, false);
        }
      )
    );
  }

  isAllCheckedOnDate$(date: string) {
    const momentDate = moment(date, DATE_FORMAT);
    const weekday = momentDate.weekday();

    return this.habits$.pipe(
      map(
        habits => {
          return habits && habits.reduce((acc, cur) => {
            if (!cur.weekdays.includes(weekday)) {
              return acc;
            }

            return acc
              && cur.checkedDates
              && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date)
              && cur.checkedDates.find(c => moment(c.date, DATE_FORMAT).format(DATE_FORMAT) === date).isChecked;
          }, true);
        }
      )
    );
  }

  getNumberOfPerfectDaysInMonth(date: string): Observable<number> {
    const momentDate = moment(date, MONTH_DATE_FORMAT);
    const days: string[] = [];
    const traverserDate = momentDate.clone().startOf('month').startOf('day');
    const last = momentDate.clone().endOf('month').startOf('day');

    while (traverserDate.isSameOrBefore(last)) {
      days.push(traverserDate.format(DATE_FORMAT));
      traverserDate.add(1, 'day');
    }

    return this.habits$.pipe(
      map(
        habits => {
          return days.reduce((acc, cur) => {
            return acc + (this.isOneCheckedOnDate(cur) && this.isAllCheckedOnDate(cur) ? 1 : 0);
          }, 0);
        }
      )
    );
  }
}
