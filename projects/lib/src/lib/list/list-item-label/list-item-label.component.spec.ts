import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemLabelComponent } from './list-item-label.component';

describe('ListItemLabelComponent', () => {
  let component: ListItemLabelComponent;
  let fixture: ComponentFixture<ListItemLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListItemLabelComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
