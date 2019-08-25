import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
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
export class EditHabitComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  title: string;
  isNew: boolean;
  habitForm: FormGroup;
  habit: Habit = {
    name: '',
    icon: 'star',
    color: 'blue',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    createdDate: null
  };
  showIconPickerModal: boolean;
  showColorPickerModal: boolean;
  isLoading: boolean;

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
    this.habitForm = this.fb.group({
      name: [this.habit && this.habit.name, [this.newNameValidator(), Validators.required]]
    });

    if (this.isNew) {
      this.title = 'Novo hábito';
    } else {
      this.isLoading = true;

      this.subscriptions.push(
        this.habitService.getHabitWithFormattedName(this.route.snapshot.params.name)
          .subscribe(
            habit => {
              if (habit === undefined) {
                return;
              }

              if (!habit || !habit.id) {
                this.router.navigateByUrl('/404');
              } else {
                this.habit = habit;
                this.habitForm.patchValue({name: habit.name});
                this.isLoading = false;
              }
            }
          )
      );

      this.title = 'Editar hábito';
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
      const alreadyHasThisName = this.habitService.habits && this.habitService.habits.reduce((res, cur) => {
        return res
          || (this.habit.id !== cur.id
          && this.habitService.formatHabitName(cur.name) === this.habitService.formatHabitName(control.value));
      }, false);
      return alreadyHasThisName ? {name: 'Já existe um hábito com esse nome'} : null;
    };
  }

  onSubmit() {
    if (this.habit.id === undefined) {
      this.habitService.createHabit(
        this.habitForm.get('name').value,
        this.habit.icon,
        this.habit.color,
        this.habit.weekdays
      );
    } else {
      this.habitService.updateHabit({...this.habit, name: this.habitForm.get('name').value});
    }
  }

  onClickedDelete() {
    this.habitService.deleteHabit(this.habit);
  }
}
