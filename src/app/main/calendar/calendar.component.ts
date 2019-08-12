import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Subscription } from 'rxjs';
import { DateCircleComponent } from 'src/app/shared/components/date-circle/date-circle.component';
import { CheckedDateService } from 'src/app/shared/services/checked-date/checked-date.service';
moment.locale('pt-BR');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    DateCircleComponent
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
  numberOfPerfectDays: number;

  datesMatrix: string[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkedDateService: CheckedDateService
  ) {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // do some logic again when I click same url
          this.formatRouterDate();
          this.buildDatesMatrix();
          this.getNumberOfPerfectDays();
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
    const re = /^\d{1,2}\-\d{2,4}$/;

    if (!this.date || !this.date.match(re)) {
      this.date = moment().format('MM-YYYY');
      this.router.navigateByUrl(`/calendar/${this.date}`);
    }

    this.momentDate = moment(this.date, 'MM-YYYY');
    this.date = this.momentDate.format('MM-YYYY');
    this.previousMonthDate = this.momentDate.clone().subtract(1, 'month').format('MM-YYYY');
    this.nextMonthDate = this.momentDate.clone().add(1, 'month').format('MM-YYYY');
    this.title = this.momentDate.format('MMMM (YYYY)');
  }

  buildDatesMatrix() {

    const firstWeekday = this.momentDate.startOf('month').weekday();

    this.datesMatrix = [];

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = i * 7; j < 7 + i * 7; j++) {
        row.push(this.momentDate.clone().add(j - firstWeekday, 'day').format('DD-MM-YYYY'));
      }
      this.datesMatrix.push(row);
    }

    if (moment(this.datesMatrix[this.datesMatrix.length - 1][0], 'DD-MM-YYYY').month() !== this.momentDate.month()) {
      this.datesMatrix.pop();
    }
  }

  notThisMonth(date: string): boolean {
    return moment(date, 'DD-MM-YYYY').month() !== this.momentDate.month();
  }

  getNumberOfPerfectDays() {
    this.numberOfPerfectDays = this.checkedDateService.getNumberOfPerfectDaysOnMonth(this.momentDate);
  }
}
