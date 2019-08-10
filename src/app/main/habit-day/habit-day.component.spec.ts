import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDayComponent } from './habit-day.component';

describe('HabitDayComponent', () => {
  let component: HabitDayComponent;
  let fixture: ComponentFixture<HabitDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
