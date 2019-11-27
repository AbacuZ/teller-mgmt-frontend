import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogbookComponent } from './edit-logbook.component';

describe('EditLogbookComponent', () => {
  let component: EditLogbookComponent;
  let fixture: ComponentFixture<EditLogbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLogbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
