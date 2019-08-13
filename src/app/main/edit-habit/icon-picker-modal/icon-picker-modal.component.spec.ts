import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPickerModalComponent } from './icon-picker-modal.component';

describe('IconPickerModalComponent', () => {
  let component: IconPickerModalComponent;
  let fixture: ComponentFixture<IconPickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconPickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
