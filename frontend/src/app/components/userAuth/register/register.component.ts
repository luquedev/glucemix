import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  private user: User

  ngOnInit(): void {
  }

}
