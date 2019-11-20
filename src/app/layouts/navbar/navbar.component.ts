import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '@app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
    public userService: UserService) { }

  ngOnInit() {
  }

}
