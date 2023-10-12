import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemActionsComponent } from './list-item-actions.component';

describe('ListItemActionsComponent', () => {
  let component: ListItemActionsComponent;
  let fixture: ComponentFixture<ListItemActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListItemActionsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
