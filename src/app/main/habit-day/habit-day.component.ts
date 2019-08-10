import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

@Component({
  selector: 'app-habit-day',
  templateUrl: './habit-day.component.html',
  styleUrls: ['./habit-day.component.scss']
})
export class HabitDayComponent implements OnInit {

  date: string;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.date = this.route.snapshot.params.date;
    const re = /^\d{1,2}\-\d{1,2}\-\d{2,4}$/;

    if (!this.date || !this.date.match(re)) {
      this.date = moment().format('DD-MM-YYYY');
      this.router.navigateByUrl(`/${this.date}`);
    }

    this.date = moment(this.date, 'DD-MM-YYYY').format('DD-MM-YYYY');

    if (moment(this.date, 'DD-MM-YYYY').startOf('day').isSame(moment().startOf('day'))) {
      this.title = 'Hoje';
    } else {
      this.title = moment(this.date, 'DD-MM-YYYY').format('DD [de] MMMM [de] YYYY');
    }
  }

}
