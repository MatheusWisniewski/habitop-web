import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitService } from 'src/app/shared/services/habit/habit.service';
import { Habit } from 'src/app/shared/models/habit.model';
import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.scss']
})
export class EditHabitComponent implements OnInit {

  title: string;
  isNew: boolean;
  habitForm: FormGroup;
  habit: Habit;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private habitService: HabitService,
    private router: Router
  ) {
    this.isNew = this.route.snapshot.data.isNew;

    if (this.isNew) {
      this.habit = {
        name: '',
        icon: 'star',
        color: 'primary',
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
      name: [this.habit.name, Validators.required],
      icon: [this.habit.icon],
      color: [this.habit.color]
    });
  }

  ngOnInit() {
  }
}
