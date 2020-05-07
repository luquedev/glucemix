import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcontrolComponent } from './newcontrol.component';

describe('NewcontrolComponent', () => {
  let component: NewcontrolComponent;
  let fixture: ComponentFixture<NewcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
