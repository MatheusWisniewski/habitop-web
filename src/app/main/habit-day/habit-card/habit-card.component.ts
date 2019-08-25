import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { IconService } from 'src/app/shared/services/icon/icon.service';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { Habit } from 'src/app/shared/models/habit.model';
import { CheckedDate } from 'src/app/shared/models/checked-date.model';
import { CheckedDateService } from 'src/app/shared/services/checked-date/checked-date.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.scss'],
  providers: [
    IconComponent
  ]
})
export class HabitCardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  @Input()
  set habit(habit: Habit) {
    this.habitLocal = habit;
    this.setCheckedDate();
  }
  @Input()
  set date(date: string) {
    this.dateLocal = date;
    this.setCheckedDate();
  }

  habitLocal: Habit = null;
  dateLocal: string = null;
  checkedDate: CheckedDate = null;

  constructor(
    private router: Router,
    private habitService: HabitService,
    private checkedDateService: CheckedDateService,
    private iconService: IconService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeFromAll();
  }

  unsubscribeFromAll() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onClickedEditItem() {
    this.router.navigateByUrl(`/edit/${this.habitService.formatHabitName(this.habitLocal.name)}`);
  }

  onClickedCheck() {
    if (this.checkedDate && this.checkedDate.id) {
      this.checkedDateService.update(this.checkedDate);
    } else {
      this.checkedDateService.create(this.checkedDate);
    }
  }

  setCheckedDate() {
    if (this.habitLocal && this.dateLocal) {
      this.unsubscribeFromAll();
      this.subscriptions = [];
      this.subscriptions.push(
        this.habitService.getCheckedDate(this.habitLocal, this.dateLocal)
        .subscribe(
          checkedDate => {
            this.checkedDate = checkedDate;
          }
        )
      );
    }
  }
}
