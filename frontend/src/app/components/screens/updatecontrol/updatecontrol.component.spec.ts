import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecontrolComponent } from './updatecontrol.component';

describe('UpdatecontrolComponent', () => {
  let component: UpdatecontrolComponent;
  let fixture: ComponentFixture<UpdatecontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
