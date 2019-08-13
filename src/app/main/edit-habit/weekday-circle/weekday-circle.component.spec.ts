import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekdayCircleComponent } from './weekday-circle.component';

describe('WeekdayCircleComponent', () => {
  let component: WeekdayCircleComponent;
  let fixture: ComponentFixture<WeekdayCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekdayCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekdayCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
