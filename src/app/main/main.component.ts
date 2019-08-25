import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AuthService } from '../shared/services/auth/auth.service';
import { HabitService } from '../shared/services/habit/habit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    HeaderComponent
  ]
})
export class MainComponent implements OnInit {

  loading = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private habitService: HabitService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.authService.getHabits().subscribe(
      (resp: any) => {
        this.habitService.setHabitsFromServer(resp);
        this.loading = false;
        setTimeout(() => {
          this.router.navigateByUrl(this.router.url);
        }, 0);
      },
      err => {
        this.snackBar.open(err.error);
      }
    );
  }
}
