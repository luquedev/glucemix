import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    public usersService: UsersService

  ) {
    this.email = '';
    this.password = '';

  }

  ngOnInit(): void {

  }

  login() {

    console.log(this.email, this.password);
    this.usersService.login(this.email, this.password)
      .then(result => localStorage.setItem("token", result.token))
      .catch((err => console.log(err)));

  }

}
