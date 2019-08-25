import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { HabitService } from '../../services/habit/habit.service';
import { DATE_FORMAT } from '../../config';
import { Observable } from 'rxjs';
moment.locale('pt-br');

@Component({
  selector: 'app-date-circle',
  templateUrl: './date-circle.component.html',
  styleUrls: ['./date-circle.component.scss']
})
export class DateCircleComponent implements OnChanges {

  @Input() date: string;
  @Input() format: 'week' | 'month' = 'month';
  @Input() opaque: boolean;
  @Input() selectedDate: string;

  displayText: string;
  emphasize: boolean;
  momentDate: moment.Moment;
  isToday: boolean;
  isOneChecked$: Observable<boolean>;
  isAllChecked$: Observable<boolean>;

  constructor(
    private habitService: HabitService
  ) { }

  ngOnChanges() {
    this.momentDate = moment(this.date, DATE_FORMAT);
    this.isOneChecked$ = this.habitService.isOneCheckedOnDate$(this.date);
    this.isAllChecked$ = this.habitService.isAllCheckedOnDate$(this.date);

    switch (this.format) {
      case 'month': this.handleMonthView(); break;
      case 'week':  this.handleWeekView();  break;
    }
  }

  handleMonthView() {
    this.displayText = this.momentDate.format('D');
    this.emphasize = moment().startOf('day').isSame(this.momentDate.startOf('day'));
  }

  handleWeekView() {
    if (this.momentDate.startOf('day').isSame(moment().startOf('day'))) {
      this.displayText = 'Hoje';
      this.isToday = true;
    } else {
      this.displayText = this.momentDate.format('ddd');
    }

    this.emphasize = this.selectedDate === this.date;
  }
}
