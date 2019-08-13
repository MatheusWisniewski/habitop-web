import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconService } from 'src/app/shared/services/icon/icon.service';

@Component({
  selector: 'app-weekday-circle',
  templateUrl: './weekday-circle.component.html',
  styleUrls: ['./weekday-circle.component.scss']
})
export class WeekdayCircleComponent implements OnInit {

  @Input() weekdayNumber: number;
  @Input() color: string;
  @Input() selected: boolean;

  @Output() clickedWeekday = new EventEmitter<void>();

  constructor(
    private iconService: IconService
  ) { }

  ngOnInit() {
  }

  onClickedWeekday() {
    this.clickedWeekday.next();
  }

  weekdayNumber2name(weekdayNumber: number) {
    switch (weekdayNumber) {
      case 0: return 'Dom';
      case 1: return 'Seg';
      case 2: return 'Ter';
      case 3: return 'Qua';
      case 4: return 'Qui';
      case 5: return 'Sex';
      case 6: return 'Sáb';
      default: return '?';
    }
  }
}
