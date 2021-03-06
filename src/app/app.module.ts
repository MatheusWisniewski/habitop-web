import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './welcome/login/login.component';
import { SignupComponent } from './welcome/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeDefaultComponent } from './welcome/welcome-default/welcome-default.component';
import { HabitDayComponent } from './main/habit-day/habit-day.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { EditHabitComponent } from './main/edit-habit/edit-habit.component';
import { HabitCardComponent } from './main/habit-day/habit-card/habit-card.component';
import { DateCircleComponent } from './shared/components/date-circle/date-circle.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { IconComponent } from './shared/components/icon/icon.component';
import { WeekdayCircleComponent } from './main/edit-habit/weekday-circle/weekday-circle.component';
import { IconPickerModalComponent } from './main/edit-habit/icon-picker-modal/icon-picker-modal.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    WelcomeDefaultComponent,
    HabitDayComponent,
    CalendarComponent,
    EditHabitComponent,
    HabitCardComponent,
    DateCircleComponent,
    HeaderComponent,
    IconComponent,
    WeekdayCircleComponent,
    IconPickerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
