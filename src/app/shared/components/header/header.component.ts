import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = localStorage.getItem('user_id') !== null;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickedSignOut() {
    localStorage.removeItem('user_id');
    this.router.navigateByUrl('/welcome');
    window.location.reload(true);
  }
}
