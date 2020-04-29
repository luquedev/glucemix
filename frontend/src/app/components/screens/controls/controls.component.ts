import { Component, OnInit } from '@angular/core';
import { ControlsService } from './../../../services/controls.service';
// import { Control } from '../../../models/controls.model';
import { ActivatedRoute } from '@angular/router';
import { Control } from 'src/app/models/controls.model';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  userNameParam: string;
  constructor(

    private activeRoute: ActivatedRoute,
    private controlsService: ControlsService

  ) {
    this.userNameParam = this.activeRoute.snapshot.params.username;
  }

  ngOnInit() {
    this.controlsService.getControlsByUserName(this.userNameParam).then(result => console.log(result))
      .catch(err => console.log(err))
  }
}
