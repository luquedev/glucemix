import { Component, OnInit } from '@angular/core';
import { ControlsService } from './../../../services/controls.service';
import { ActivatedRoute } from '@angular/router';
import { Control } from 'src/app/models/controls.model';
import { FormGroup, FormControl } from '@angular/forms';



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
    private controlsService: ControlsService,


  ) {

    this.userNameParam = this.activeRoute.snapshot.params.username;

  }

  async ngOnInit() {

    try {
      this.arrControl = await this.controlsService.getControlsByUserName(this.userNameParam)
      console.log(this.arrControl);
    } catch (error) {
      console.log(error)
    }
  }

  eliminar(pId) {
    console.log(pId);
  }

  editar(pId) {
    console.log(pId);
  }
}