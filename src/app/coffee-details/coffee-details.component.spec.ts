import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDetailsComponent } from './coffee-details.component';

describe('CoffeeDetailsComponent', () => {
  let component: CoffeeDetailsComponent;
  let fixture: ComponentFixture<CoffeeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
