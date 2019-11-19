import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTellerDetailsComponent } from './list-teller-details.component';

describe('ListTellerDetailsComponent', () => {
  let component: ListTellerDetailsComponent;
  let fixture: ComponentFixture<ListTellerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTellerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTellerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
