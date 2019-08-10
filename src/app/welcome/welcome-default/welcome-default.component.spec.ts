import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeDefaultComponent } from './welcome-default.component';

describe('WelcomeDefaultComponent', () => {
  let component: WelcomeDefaultComponent;
  let fixture: ComponentFixture<WelcomeDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
