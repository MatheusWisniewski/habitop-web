import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Subscription, Observable } from 'rxjs';
import { DateCircleComponent } from 'src/app/shared/components/date-circle/date-circle.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { DATE_FORMAT, MONTH_DATE_FORMAT } from 'src/app/shared/config';
import { CheckedDateService } from 'src/app/shared/services/checked-date/checked-date.service';
moment.locale('pt-BR');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    DateCircleComponent,
    IconComponent
  ]
})
export class CalendarComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  date: string;
  momentDate: moment.Moment;
  previousMonthDate: string;
  nextMonthDate: string;
  title: string;
  weekdays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  numberOfPerfectDays$: Observable<number>;
  datesMatrix: string[][] = [];

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
          this.formatRouterDate();
          this.numberOfPerfectDays$ = this.habitService.getNumberOfPerfectDaysInMonth(this.date);
          this.buildDatesMatrix();
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
    const re = /^\d{4}\-\d{2}$/;

    if (!this.date || !this.date.match(re)) {
      this.date = moment().format(MONTH_DATE_FORMAT);
      this.router.navigateByUrl(`/calendar/${this.date}`);
    }

    this.momentDate = moment(this.date, MONTH_DATE_FORMAT);
    this.date = this.momentDate.format(MONTH_DATE_FORMAT);
    this.previousMonthDate = this.momentDate.clone().subtract(1, 'month').format(MONTH_DATE_FORMAT);
    this.nextMonthDate = this.momentDate.clone().add(1, 'month').format(MONTH_DATE_FORMAT);
    this.title = this.momentDate.format('MMMM (YYYY)');
    this.checkedDateService.getMonthFromServer(this.date);
  }

  buildDatesMatrix() {

    const firstWeekday = this.momentDate.startOf('month').weekday();

    this.datesMatrix = [];

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = i * 7; j < 7 + i * 7; j++) {
        row.push(this.momentDate.clone().startOf('month').add(j - firstWeekday, 'day').format(DATE_FORMAT));
      }
      this.datesMatrix.push(row);
    }

    if (moment(this.datesMatrix[this.datesMatrix.length - 1][0], DATE_FORMAT).month() !== this.momentDate.month()) {
      this.datesMatrix.pop();
    }
  }

  notThisMonth(date: string): boolean {
    return moment(date, DATE_FORMAT).month() !== this.momentDate.month();
  }
}
