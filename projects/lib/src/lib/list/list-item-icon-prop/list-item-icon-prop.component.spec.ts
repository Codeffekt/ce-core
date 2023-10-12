import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemIconPropComponent } from './list-item-icon-prop.component';

describe('ListItemIconPropComponent', () => {
  let component: ListItemIconPropComponent;
  let fixture: ComponentFixture<ListItemIconPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListItemIconPropComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemIconPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
