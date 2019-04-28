import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsListComponent } from './collections-list.component';

describe('CollectionsListComponent', () => {
  let component: CollectionsListComponent;
  let fixture: ComponentFixture<CollectionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
