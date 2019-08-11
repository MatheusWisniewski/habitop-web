import { Injectable } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { HttpClient } from '@angular/common/http';
import { response } from './response.mock';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  habits: Habit[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.getUserHabits();
  }

  getUserHabits() {
    this.habits = response;
  }

  formatHabitName(name: string) {
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const lowerCase = (str: string) => str.toLowerCase();
    const replaceStringsWithDash = (str: string) => str.replace(/\s/g, '-');

    return replaceStringsWithDash(lowerCase(normalize(name)));
  }

  getHabitWithFormattedName(formattedName: string) {
    return this.habits.find(habit => {
      return this.formatHabitName(habit.name) === formattedName;
    });
  }
}
