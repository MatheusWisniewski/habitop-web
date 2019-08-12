import { Component, OnInit, Input } from '@angular/core';
import { IconService } from '../../services/icon/icon.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon: string;
  @Input() color: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  constructor(
    private iconService: IconService
  ) { }

  ngOnInit() {
  }
}
