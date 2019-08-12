import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Habit } from 'src/app/shared/models/habit.model';
import { HabitCardComponent } from './habit-card/habit-card.component';
import { DateCircleComponent } from 'src/app/shared/components/date-circle/date-circle.component';
import { Subscription } from 'rxjs';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { HabitDay } from 'src/app/shared/models/habit-day.model';
import { CheckedDateService } from 'src/app/shared/services/checked-date/checked-date.service';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
moment.locale('pt-BR');

@Component({
  selector: 'app-habit-day',
  templateUrl: './habit-day.component.html',
  styleUrls: ['./habit-day.component.scss'],
  providers: [
    HabitCardComponent,
    DateCircleComponent,
    IconComponent
  ]
})
export class HabitDayComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  date: string;
  momentDate: moment.Moment;
  monthDate: string;
  previousWeekDates: string[] = [];
  previousDate: string;
  nextDate: string;
  title: string;
  filteredHabits: Habit[];
  habitDay: HabitDay;
  weekday: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private habitService: HabitService,
    private checkedDateService: CheckedDateService
  ) {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // do some logic again when I click same url
          this.filteredHabits = [];
          this.formatRouterDate();
          this.filterHabits();
          this.getCurrentDatesChecks();
        }
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  formatRouterDate() {
    this.date = this.route.snapshot.params.date;
    const re = /^\d{1,2}\-\d{1,2}\-\d{2,4}$/;

    if (!this.date || !this.date.match(re)) {
      this.date = moment().format('DD-MM-YYYY');
      this.router.navigateByUrl(`/${this.date}`);
    }

    this.momentDate = moment(this.date, 'DD-MM-YYYY');
    this.date = this.momentDate.format('DD-MM-YYYY');
    this.checkedDateService.lastNavigatedDate = this.date;
    this.monthDate = this.momentDate.format('MM-YYYY');
    this.previousWeekDates = [];
    this.previousDate = this.momentDate.clone().subtract(1, 'day').format('DD-MM-YYYY');
    this.nextDate = this.momentDate.clone().add(1, 'day').format('DD-MM-YYYY');

    for (let i = 0; i < 7; i++) {
      this.previousWeekDates.push(moment().subtract(i, 'day').format('DD-MM-YYYY'));
    }

    this.title = this.momentDate.year() === moment().year()
      ? this.momentDate.format('D [de] MMMM')
      : this.momentDate.format('D [de] MMMM [de] YYYY');
    this.weekday = this.momentDate.format('dddd') + (this.momentDate.startOf('day').isSame(moment().startOf('day')) ? ' (Hoje)' : '');
  }

  filterHabits() {
    this.filteredHabits = this.habitService.habits.filter((habit: Habit) => {
      const wasCreatedOnCurrentDateOrBefore = moment(habit.creationDate, 'DD-MM-YYYY').isSameOrBefore(moment(this.date, 'DD-MM-YYYY'));
      const shouldBeDisplayedOnThisWeekday = habit.weekdays.includes(this.momentDate.weekday());
      return wasCreatedOnCurrentDateOrBefore && shouldBeDisplayedOnThisWeekday;
    });
  }

  getCurrentDatesChecks() {
    this.habitDay = this.checkedDateService.getHabitDayFromMomentDate(this.momentDate);
  }
}
