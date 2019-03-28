import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveListComponent } from './reserve-list.component';

describe('ReserveListComponent', () => {
  let component: ReserveListComponent;
  let fixture: ComponentFixture<ReserveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
