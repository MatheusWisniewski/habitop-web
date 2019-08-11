import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

@Component({
  selector: 'app-date-circle',
  templateUrl: './date-circle.component.html',
  styleUrls: ['./date-circle.component.scss']
})
export class DateCircleComponent implements OnInit {

  @Input() date: string;
  @Input() format: 'week' | 'month' = 'month';
  @Input() opaque: boolean;

  displayText: string;
  isCurrentDate: boolean;
  isFutureDate: boolean;

  constructor() { }

  ngOnInit() {
    const momentDate = moment(this.date, 'DD-MM-YYYY');
    this.isCurrentDate = moment().startOf('day').isSame(momentDate.startOf('day'));
    this.isFutureDate = moment().startOf('day').isBefore(momentDate.startOf('day'));

    switch (this.format) {
      case 'month': this.displayText = momentDate.format('D'); break;
      case 'week':
        if (momentDate.startOf('day').isSame(moment().startOf('day'))) {
          this.displayText = 'Hoje';
        } else {
          this.displayText = momentDate.format('ddd')[0];
        }
        break;
    }
  }

}
