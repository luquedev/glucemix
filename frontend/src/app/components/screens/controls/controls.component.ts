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

  formulario: FormGroup;

  userNameParam: string;

  posArray: number;





  constructor(

    private activeRoute: ActivatedRoute,
    private controlsService: ControlsService,


  ) {

    this.posArray = 0;
    this.userNameParam = this.activeRoute.snapshot.params.username;

  }

  async ngOnInit() {

    try {
      this.arrControl = await this.controlsService.getControlsByUserName(this.userNameParam)
      console.log(this.arrControl);
    } catch (error) {
      console.log(error)
    }
    this.formulario = new FormGroup(
      {
        id: new FormControl(''),
        newDate: new FormControl(''),
        newTime: new FormControl(''),
        newMgdl: new FormControl('')
      });

  }

  eliminar(pId) {
    console.log(pId);
  }

  modificar(pIndex) {
    console.log(this.arrControl[pIndex]);
    /* this.formulario.value.id = pIndex; */
    this.controlsService.updateControlById(this.formulario.value).then((result) => console.log(result))
      .catch((error) => console.log(error));


    console.log(this.formulario.value);
  }

  onSubmit() {

  }

}

/*
this.controlsService.getControlsByUserName(this.userNameParam).then(result => console.log(result))
  .catch(err => console.log(err)) */
