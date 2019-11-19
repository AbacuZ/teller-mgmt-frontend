import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTellerDetailsComponent } from './create-teller-details.component';

describe('CreateTellerDetailsComponent', () => {
  let component: CreateTellerDetailsComponent;
  let fixture: ComponentFixture<CreateTellerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTellerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTellerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
