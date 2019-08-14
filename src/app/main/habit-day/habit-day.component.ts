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
import { HabitWithDayInfo } from 'src/app/shared/models/habit-with-day-info';
import { TransitionGroupComponent } from 'src/app/shared/components/transition-group/transition-group.component';
import { TransitionGroupItemDirective } from 'src/app/shared/directives/transition-group-item/transition-group-item.directive';
import { DateCircleInfo } from 'src/app/shared/models/date-circle-info.model';
moment.locale('pt-BR');

@Component({
  selector: 'app-habit-day',
  templateUrl: './habit-day.component.html',
  styleUrls: ['./habit-day.component.scss'],
  providers: [
    HabitCardComponent,
    DateCircleComponent,
    IconComponent,
    TransitionGroupComponent,
    TransitionGroupItemDirective
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
  habitsWithDayInfo$: Observable<HabitWithDayInfo[]>;
  previousWeeksChecks: DateCircleInfo[];
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
          this.formatRouterDate();
          this.habitsWithDayInfo$ = this.habitService.getHabitsWithDayInfo(this.momentDate);
          this.setPreviousWeekValues();
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
    this.previousDate = this.momentDate.clone().subtract(1, 'day').format('DD-MM-YYYY');
    this.nextDate = this.momentDate.clone().add(1, 'day').format('DD-MM-YYYY');

    this.title = this.momentDate.year() === moment().year()
      ? this.momentDate.format('D [de] MMMM')
      : this.momentDate.format('D [de] MMMM [de] YYYY');
    this.weekday = this.momentDate.format('dddd') + (this.momentDate.startOf('day').isSame(moment().startOf('day')) ? ' (Hoje)' : '');
  }

  onClickedCheck(habitWithDayInfo: HabitWithDayInfo) {
    if (habitWithDayInfo.checkId) {
      this.checkedDateService.update(habitWithDayInfo.checkId);
    } else {
      this.checkedDateService.create(habitWithDayInfo.id, this.momentDate.format('DD-MM-YYYY'));
    }
  }

  habitsWithDayInfoTrackByFn(index, item) {
    return item.id;
  }

  setPreviousWeekValues() {
    this.previousWeeksChecks = [];

    for (let i = 0; i < 7; i++) {
      this.previousWeeksChecks.push(this.habitService.getDateCircleInfo(moment().subtract(i, 'days')));
    }
  }
}
