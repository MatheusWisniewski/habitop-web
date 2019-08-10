import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCircleComponent } from './date-circle.component';

describe('DateCircleComponent', () => {
  let component: DateCircleComponent;
  let fixture: ComponentFixture<DateCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
