import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { IconService } from 'src/app/shared/services/icon/icon.service';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { HabitWithDayInfo } from 'src/app/shared/models/habit-with-day-info';

@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.scss'],
  providers: [
    IconComponent
  ]
})
export class HabitCardComponent implements OnInit {

  @Input() habitWithDayInfo: HabitWithDayInfo;

  @Output() clickedCheck = new EventEmitter<void>();

  constructor(
    private router: Router,
    private habitService: HabitService,
    private iconService: IconService
  ) { }

  ngOnInit() {
  }

  onClickedEditItem() {
    this.router.navigateByUrl(`/edit/${this.habitService.formatHabitName(this.habitWithDayInfo.name)}`);
  }

  onClickedCheck() {
    this.clickedCheck.next();
  }
}
