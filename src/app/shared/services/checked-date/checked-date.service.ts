import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { API_URL, DATE_FORMAT, MONTH_DATE_FORMAT } from '../../config';
import { CheckedDate } from '../../models/checked-date.model';
import { HabitService } from '../habit/habit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
moment.locale('pt-BR');

@Injectable({
  providedIn: 'root'
})
export class CheckedDateService {

  alreadyCalledDates: string[] = [];

  USER_RESOURCE_URL = () => API_URL + 'users/' + localStorage.getItem('user_id') + '/checked-dates/';

  HABIT_RESOURCE_URL = () => API_URL + 'habits/';

  CHECKED_DATE_RESOURCE_URL = () => API_URL + 'checked-dates/';

  constructor(
    private httpClient: HttpClient,
    private habitService: HabitService,
    private snackBar: MatSnackBar
  ) {
  }

  create(checkedDate: CheckedDate) {
    const {habitId, ...checkWithoutHabitId} = checkedDate;
    checkWithoutHabitId.isChecked = true;
    checkWithoutHabitId.streak++;

    this.httpClient.post<CheckedDate[]>(
      this.HABIT_RESOURCE_URL() + habitId + '/checked-dates',
      checkWithoutHabitId
      ).subscribe(
        resp => {
          this.cache(resp);
        },
        err => {
          this.snackBar.open(err.error);
        }
      );
  }

  update(checkedDate: CheckedDate) {
    const {habitId, ...checkWithoutHabitId} = checkedDate;
    if (checkWithoutHabitId.isChecked) {
      checkWithoutHabitId.streak--;
    } else {
      checkWithoutHabitId.streak++;
    }
    checkWithoutHabitId.isChecked = !checkWithoutHabitId.isChecked;

    this.httpClient.put<CheckedDate[]>(
      this.CHECKED_DATE_RESOURCE_URL() + checkedDate.id,
      checkWithoutHabitId
    ).subscribe(
      resp => {
        this.cache(resp);
      },
      err => {
        this.snackBar.open(err.error);
      }
    );
  }

  getDayFromServer(date: string) {
    if (this.alreadyCalledDates.find(alreadyCalledDate => alreadyCalledDate === date)) {
      return;
    }

    this.alreadyCalledDates.push(date);

    this.httpClient.get<CheckedDate[]>(
      this.USER_RESOURCE_URL() + `?startDate=${date}`
    ).subscribe(
      resp => {
        this.cache(resp);
      },
      err => {
        this.snackBar.open(err.error);
      }
    );
  }

  getMonthFromServer(date: string) {
    const momentDate = moment(date, MONTH_DATE_FORMAT).startOf('month');
    const newDates = [];

    while (momentDate.format(DATE_FORMAT) !== moment(date).endOf('month').format(DATE_FORMAT)) {
      newDates.push(momentDate.format(DATE_FORMAT));
      momentDate.add(1, 'day');
    }

    const alreadyCalledAll = newDates.reduce((acc, cur) => {
      return acc && this.alreadyCalledDates.find(alreadyCalledDate => alreadyCalledDate === cur);
    }, true);

    if (alreadyCalledAll) {
      return;
    }

    newDates.forEach(newDate => {
      this.alreadyCalledDates = this.alreadyCalledDates.filter(alreadyCalledDate => alreadyCalledDate !== newDate);
      this.alreadyCalledDates.push(newDate);
    });

    const start = moment(date, MONTH_DATE_FORMAT).startOf('month').format(DATE_FORMAT);
    const end = moment(date, MONTH_DATE_FORMAT).endOf('month').format(DATE_FORMAT);

    this.httpClient.get<CheckedDate[]>(
      this.USER_RESOURCE_URL() +
      `?startDate=${start}&endDate=${end}`
    ).subscribe(
      resp => {
        this.cache(resp);
      },
      err => {
        this.snackBar.open(err.error);
      }
    );
  }

  private cache(checkedDates: CheckedDate[]) {
    checkedDates.forEach(checkedDate => {
      const habit = this.habitService.habits.find(h => h.id === checkedDate.habitId);

      habit.checkedDates = habit.checkedDates && habit.checkedDates.filter(c => c.date !== checkedDate.date) || [];
      habit.checkedDates.push(checkedDate);
    });
    this.habitService.broadcast();
  }
}
