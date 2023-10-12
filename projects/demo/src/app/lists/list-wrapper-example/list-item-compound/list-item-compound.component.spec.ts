import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemCompoundComponent } from './list-item-compound.component';

describe('ListItemCompoundComponent', () => {
  let component: ListItemCompoundComponent;
  let fixture: ComponentFixture<ListItemCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
