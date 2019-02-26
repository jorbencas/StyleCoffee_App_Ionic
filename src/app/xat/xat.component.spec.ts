import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { xatComponent } from './xat.component';

describe('xatComponent', () => {
  let component: xatComponent;
  let fixture: ComponentFixture<xatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ xatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(xatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
