import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { Habit } from 'src/app/shared/models/habit.model';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { CheckedDateService } from 'src/app/shared/services/checked-date/checked-date.service';
import { WeekdayCircleComponent } from './weekday-circle/weekday-circle.component';
import { IconService } from 'src/app/shared/services/icon/icon.service';
import { IconPickerModalComponent } from './icon-picker-modal/icon-picker-modal.component';
moment.locale('pt-BR');

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.scss'],
  providers: [
    WeekdayCircleComponent,
    IconPickerModalComponent
  ]
})
export class EditHabitComponent implements OnInit {

  title: string;
  isNew: boolean;
  habitForm: FormGroup;
  habit: Habit;
  showIconPickerModal: boolean;
  showColorPickerModal: boolean;

  weekdays = [0, 1, 2, 3, 4, 5, 6];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private habitService: HabitService,
    private checkedDateService: CheckedDateService,
    private iconService: IconService,
    private router: Router
  ) {
    this.isNew = this.route.snapshot.data.isNew;

    if (this.isNew) {
      this.habit = {
        name: '',
        icon: 'star',
        color: 'blue',
        weekdays: [0, 1, 2, 3, 4, 5, 6],
        creationDate: moment().format('DD-MM-YYYY')
      };

      this.title = 'Novo hábito';

    } else {
      this.habit = this.habitService.getHabitWithFormattedName(this.route.snapshot.params.name);

      if (!this.habit) {
        this.router.navigateByUrl('/404');
      }

      this.title = 'Editar hábito';
    }

    this.habitForm = this.fb.group({
      name: [this.habit.name, [this.newNameValidator(), Validators.required]],
      icon: [this.habit.icon],
      color: [this.habit.color]
    });
  }

  ngOnInit() {
  }

  onClickedWeekday(weekdayNumber: number) {
    if (this.habit.weekdays.length === 1 && this.habit.weekdays.includes(weekdayNumber)) {
      return;
    }

    if (this.habit.weekdays.length === 7) {
      this.habit.weekdays = [weekdayNumber];
    } else if (this.habit.weekdays.includes(weekdayNumber)) {
      this.habit.weekdays = this.habit.weekdays.filter(w => w !== weekdayNumber);
    } else {
      this.habit.weekdays.push(weekdayNumber);
    }
  }

  onClickedEveryDayButton() {
    this.habit.weekdays = [...this.weekdays];
  }

  onClickedIcon() {
    this.showIconPickerModal = true;
  }

  onClickedColor() {
    this.showColorPickerModal = true;
  }

  onSelectedIcon(icon: string) {
    this.habit.icon = icon;
    this.showIconPickerModal = false;
  }

  onSelectedColor(color: string) {
    this.habit.color = color;
    this.showColorPickerModal = false;
  }

  onClickedCloseModal() {
    this.showIconPickerModal = false;
    this.showColorPickerModal = false;
  }

  newNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const alreadyHasThisName = this.habitService.habits.reduce((res, cur) => {
        return res
          || (this.habit.id !== cur.id
          && this.habitService.formatHabitName(cur.name) === this.habitService.formatHabitName(control.value));
      }, false);
      return alreadyHasThisName ? {name: 'Já existe um hábito com esse nome'} : null;
    };
  }
}
