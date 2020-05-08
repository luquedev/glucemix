import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../../services/controls.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  controls: any = [];
  userNameParam: string;

  constructor(private controlsService: ControlsService,
    private activatedRoute: ActivatedRoute) {
    this.userNameParam = this.activatedRoute.snapshot.params.username;
  }

  ngOnInit(): void {
    this.controlsService.getControls().subscribe(
      res => {
        console.log(res);
        this.controls = res;
      },
      err => console.log(err)
    );
  }

}
