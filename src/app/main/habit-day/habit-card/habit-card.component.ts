import { Component, OnInit, Input } from '@angular/core';
import { Habit } from 'src/app/shared/models/habit.model';
import { HabitCheck } from 'src/app/shared/models/habit-check.model';
import { Router } from '@angular/router';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { IconService } from 'src/app/shared/services/icon/icon.service';

@Component({
  selector: 'app-habit-card',
  templateUrl: './habit-card.component.html',
  styleUrls: ['./habit-card.component.scss']
})
export class HabitCardComponent implements OnInit {

  @Input() habit: Habit;
  @Input() check: HabitCheck;

  constructor(
    private router: Router,
    private habitService: HabitService,
    private iconService: IconService
  ) { }

  ngOnInit() {
  }

  onClickedEditItem() {
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const lowerCase = (str: string) => str.toLowerCase();
    const replaceStringsWithDash = (str: string) => str.replace(/\s/g, '-');

    const formattedHabitName = replaceStringsWithDash(lowerCase(normalize(this.habit.name)));

    this.router.navigateByUrl(`/edit/${formattedHabitName}`);
  }

  onClickedCheck() {
    this.check.isChecked = !this.check.isChecked;
  }
}
