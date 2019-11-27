import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogbookComponent } from './list-logbook.component';

describe('ListLogbookComponent', () => {
  let component: ListLogbookComponent;
  let fixture: ComponentFixture<ListLogbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLogbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLogbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
