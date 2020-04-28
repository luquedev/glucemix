import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../services/controls.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(
    private controlsService: ControlsService
  ) { }

  ngOnInit() {
    this.controlsService.getControlsByUserName().then(result => console.log(result))
      .catch(err => console.log(err))
  }
}
