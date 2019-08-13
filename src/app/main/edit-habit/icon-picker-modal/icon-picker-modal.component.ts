import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

@Component({
  selector: 'app-icon-picker-modal',
  templateUrl: './icon-picker-modal.component.html',
  styleUrls: ['./icon-picker-modal.component.scss'],
  providers: [
    IconComponent
  ]
})
export class IconPickerModalComponent implements OnInit {

  iconOptions: string[] = [
    'accessibility',
    'alarm',
    'assignment',
    'book',
    'code',
    'attach_money',
    'favorite',
    'star',
    'pets',
    'question_answer',
    'schedule',
    'shopping_cart',
    'thumb_up',
    'translate',
    'work',
    'mic',
    'create',
    'inbox',
    'mail',
    'desktop_windows',
    'audiotrack',
    'brush',
    'color_lens',
    'photo_camera',
    'directions_bike',
    'directions_run',
    'hotel',
    'restaurant',
    'spa',
    'mood'
  ];

  colorOptions: string[] = [
    'red',
    'green',
    'yellow',
    'blue',
    'purple',
    'orange'
  ];

  @Input() type: 'icons' | 'colors';
  @Input() color: string;

  @Output() clickedIcon = new EventEmitter<string>();
  @Output() clickedColor = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClickedIcon(icon: string) {
    this.clickedIcon.next(icon);
  }

  onClickedColor(color: string) {
    this.clickedColor.next(color);
  }

  onClickedClose() {
    console.log('tyfsgas');
    this.closeModal.next();
  }
}
