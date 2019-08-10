import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login/login.component';
import { SignupComponent } from './welcome/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeDefaultComponent } from './welcome/welcome-default/welcome-default.component';
import { HabitDayComponent } from './main/habit-day/habit-day.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { CalendarMonthComponent } from './main/calendar/calendar-month/calendar-month.component';
import { EditHabitComponent } from './main/edit-habit/edit-habit.component';


const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: WelcomeDefaultComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  },
  {
    path: 'login',
    redirectTo: 'welcome'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HabitDayComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        children: [
          {
            path: ':date',
            component: CalendarMonthComponent
          }
        ]
      },
      {
        path: 'new',
        component: EditHabitComponent,
        data: {
          isNew: true
        }
      },
      {
        path: 'edit',
        children: [
          {
            path: ':id',
            component: EditHabitComponent,
            data: {
              isNew: false
            }
          }
        ]
      },
      {
        path: ':date',
        component: HabitDayComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
