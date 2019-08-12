import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
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
  @Input() isOneChecked: boolean;
  @Input() isAllChecked: boolean;

  displayText: string;
  emphasize: boolean;
  momentDate: moment.Moment;
  isToday: boolean;

  constructor() { }

  ngOnChanges() {
    this.momentDate = moment(this.date, 'DD-MM-YYYY');

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
