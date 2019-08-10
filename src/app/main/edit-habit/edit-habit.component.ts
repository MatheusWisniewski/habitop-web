import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.scss']
})
export class EditHabitComponent implements OnInit {

  isNew: boolean;

  constructor(
    private route: ActivatedRoute
  ) {
    this.isNew = this.route.snapshot.data.isNew;
  }

  ngOnInit() {
  }

}
