import { Component, OnInit } from '@angular/core';
import { ControlsService } from './../../../services/controls.service';
import { ActivatedRoute } from '@angular/router';
import { Controls } from 'src/app/models/controls.model';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  arrControl: Controls[];

  formulario: FormGroup;

  userNameParam: string;

  idRecogido: number;


  constructor(

    private activatedRoute: ActivatedRoute,
    private controlsService: ControlsService


  ) {

    this.idRecogido = 0;
    this.userNameParam = this.activatedRoute.snapshot.params.username;

  }

  async ngOnInit() {

    try {
      this.arrControl = await this.controlsService.getControlsByUserName(this.userNameParam)
      // console.log(this.arrControl);
    } catch (error) {
      console.log(error)
    }

    this.formulario = new FormGroup({
      id: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
      mgdl: new FormControl('')
    });

    this.controlsService.getControlsByUserName(this.userNameParam).then((pControl) => {
      this.arrControl = pControl;
      console.log(pControl)
    })
      .catch(err => console.log(err));
  }

  eliminar(pId) {
    console.log(pId);
  }

  editar(pId) {
    console.log(pId);
    this.idRecogido = pId;

  }


  onSubmit() {

    this.formulario.value.id = this.idRecogido;
    console.log(this.formulario.value);
    this.controlsService.actualizarControlById(this.formulario.value);
  }
}

