import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { HabitCardComponent } from './habit-card/habit-card.component';
import { DateCircleComponent } from 'src/app/shared/components/date-circle/date-circle.component';
import { Subscription, Observable } from 'rxjs';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { CheckedDateService } from 'src/app/shared/services/checked-date/checked-date.service';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { Habit } from 'src/app/shared/models/habit.model';
import { DATE_FORMAT, MONTH_DATE_FORMAT } from 'src/app/shared/config';
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
  previousDate: string;
  nextDate: string;
  title: string;
  weekday: string;
  isToday: boolean;
  habits$: Observable<Habit[]>;
  previousWeekDates: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private habitService: HabitService,
    private checkedDateService: CheckedDateService
  ) {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.handleRouterDateChange();
        }
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  handleRouterDateChange() {
    this.date = this.route.snapshot.params.date;
    this.momentDate = moment(this.date, DATE_FORMAT);
    const re = /^\d{4}\-\d{2}\-\d{2}$/;

    if (!this.date || !this.date.match(re)) {
      this.date = moment().format(DATE_FORMAT);
      this.router.navigateByUrl(`/${this.date}`);
      return;
    }

    this.checkedDateService.getDayFromServer(this.momentDate.format(DATE_FORMAT));
    this.date = this.momentDate.format(DATE_FORMAT);
    this.habits$ = this.habitService.getHabitsThatHappenOnDate(this.date);
    this.habitService.lastNavigatedDate = this.date;
    this.monthDate = this.momentDate.format(MONTH_DATE_FORMAT);
    this.previousDate = this.momentDate.clone().subtract(1, 'day').format(DATE_FORMAT);
    this.nextDate = this.momentDate.clone().add(1, 'day').format(DATE_FORMAT);

    this.title = this.momentDate.year() === moment().year()
      ? this.momentDate.format('D [de] MMMM')
      : this.momentDate.format('D [de] MMMM [de] YYYY');

    this.isToday = this.momentDate.startOf('day').isSame(moment().startOf('day'));
    this.weekday = this.momentDate.format('dddd') + (this.isToday ? ' (Hoje)' : '');

    this.setPreviousWeekValues();
  }

  habitsWithDayInfoTrackByFn(index, item) {
    return item.id;
  }

  setPreviousWeekValues() {
    this.previousWeekDates = [];

    for (let i = 0; i < 7; i++) {
      this.previousWeekDates.push(moment().subtract(i, 'days').format(DATE_FORMAT));
    }
  }
}
