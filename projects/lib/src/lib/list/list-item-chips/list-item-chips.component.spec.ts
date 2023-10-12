import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemChipsComponent } from './list-item-chips.component';

describe('ListItemChipsComponent', () => {
  let component: ListItemChipsComponent;
  let fixture: ComponentFixture<ListItemChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListItemChipsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
