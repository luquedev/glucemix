import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../../services/controls.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {


  controls: any = [];
  userControlId: any[];

  userNameParam: string;

  userId: number;

  cookie: string;

  constructor(private controlsService: ControlsService,
    private activatedRoute: ActivatedRoute) {
    this.userId = environment.userId;
    this.userControlId = [];
    this.userNameParam = this.activatedRoute.snapshot.params.username;
  }

  ngOnInit(): void {


    this.cookie = localStorage.getItem('userId');
    console.log(this.cookie);

    this.controlsService.getControls().subscribe(
      res => {
        console.log(res);
        this.controls = res;
      },
      err => console.log(err)
    );


    // MARIO, aquí es donde he conseguido que coja el id de la cookie pero no se si está bien hecho.
    this.controlsService.getControlsByUserId(this.cookie)
      .then(result => { this.userControlId = result; console.log(result) })
      .catch(err => console.log(err));
  }
}
