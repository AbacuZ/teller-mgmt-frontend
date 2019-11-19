import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTellerDetailsComponent } from './edit-teller-details.component';

describe('EditTellerDetailsComponent', () => {
  let component: EditTellerDetailsComponent;
  let fixture: ComponentFixture<EditTellerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTellerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTellerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
