import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTellerComponent } from './list-teller.component';

describe('ListTellerComponent', () => {
  let component: ListTellerComponent;
  let fixture: ComponentFixture<ListTellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
