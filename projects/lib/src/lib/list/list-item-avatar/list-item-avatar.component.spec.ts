import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemAvatarComponent } from './list-item-avatar.component';

describe('ListItemAvatarComponent', () => {
  let component: ListItemAvatarComponent;
  let fixture: ComponentFixture<ListItemAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ListItemAvatarComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
