import { Component, OnInit } from '@angular/core';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { Routes } from '@angular/router';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getAllUsers().then(result => console.log(result))
      .catch(err => console.log(err))
  }

}
