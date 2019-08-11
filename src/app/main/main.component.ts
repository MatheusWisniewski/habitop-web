import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    HeaderComponent
  ]
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
}
