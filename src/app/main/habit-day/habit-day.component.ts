import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Habit } from 'src/app/shared/models/habit.model';
import { HabitDate } from 'src/app/shared/models/habit-date.model';
import { HabitCardComponent } from './habit-card/habit-card.component';
import { DateCircleComponent } from 'src/app/shared/components/date-circle/date-circle.component';
import { Subscription } from 'rxjs';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
moment.locale('pt-BR');

@Component({
  selector: 'app-habit-day',
  templateUrl: './habit-day.component.html',
  styleUrls: ['./habit-day.component.scss'],
  providers: [
    HabitCardComponent,
    DateCircleComponent
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
  habitDate: HabitDate;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private habitService: HabitService
  ) {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // do some logic again when I click same url
          this.filteredHabits = [];
          this.formatRouterDate();
          this.mockData();
          this.filterHabits();
        }
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  mockData() {

    this.habitDate = new HabitDate(this.date, [
      {
        id: 1,
        habitId: 1,
        isChecked: false,
        streak: 2
      },
      {
        id: 2,
        habitId: 2,
        isChecked: false,
        streak: 0
      },
      {
        id: 3,
        habitId: 3,
        isChecked: false,
        streak: 2
      },
      {
        id: 4,
        habitId: 4,
        isChecked: false,
        streak: 0
      },
      {
        id: 5,
        habitId: 5,
        isChecked: false,
        streak: 2
      },
      {
        id: 6,
        habitId: 6,
        isChecked: false,
        streak: 0
      }
    ]);
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
    this.monthDate = this.momentDate.format('MM-YYYY');
    this.previousWeekDates = [];
    this.previousDate = this.momentDate.clone().subtract(1, 'day').format('DD-MM-YYYY');
    this.nextDate = this.momentDate.clone().add(1, 'day').format('DD-MM-YYYY');

    for (let i = 0; i < 7; i++) {
      this.previousWeekDates.push(moment().subtract(i, 'day').format('DD-MM-YYYY'));
    }

    if (this.momentDate.startOf('day').isSame(moment().startOf('day'))) {
      this.title = 'Hoje';
    } else {
      this.title = this.momentDate.format('D [de] MMMM [de] YYYY');
    }
  }

  filterHabits() {
    this.filteredHabits = this.habitService.habits.filter((habit: Habit) => {
      const wasCreatedOnCurrentDateOrBefore = moment(habit.creationDate, 'DD-MM-YYYY').isSameOrBefore(moment(this.date, 'DD-MM-YYYY'));
      const shouldBeDisplayedOnThisWeekday = habit.weekdays.includes(this.momentDate.weekday());
      return wasCreatedOnCurrentDateOrBefore && shouldBeDisplayedOnThisWeekday;
    });
  }
}
