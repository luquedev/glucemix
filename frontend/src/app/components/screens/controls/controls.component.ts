import { Component, OnInit } from '@angular/core';
import { ControlsService } from './../../../services/controls.service';
import { ActivatedRoute } from '@angular/router';
import { Control } from 'src/app/models/controls.model';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  arrControl: Control[];

  userNameParam: string;
  constructor(

    private activeRoute: ActivatedRoute,
    private controlsService: ControlsService

  ) {

    this.userNameParam = this.activeRoute.snapshot.params.username;
  }

  ngOnInit() {

    this.controlsService.getControlsByUserName(this.userNameParam).then((pControl) => {
      this.arrControl = pControl
      console.log(pControl)
    })
      .catch(err => console.log(err))
  }
}

/*
this.controlsService.getControlsByUserName(this.userNameParam).then(result => console.log(result))
  .catch(err => console.log(err)) */
