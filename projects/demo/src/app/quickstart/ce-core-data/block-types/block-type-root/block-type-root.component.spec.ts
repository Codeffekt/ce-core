import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTypeRootComponent } from './block-type-root.component';

describe('BlockTypeRootComponent', () => {
  let component: BlockTypeRootComponent;
  let fixture: ComponentFixture<BlockTypeRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockTypeRootComponent]
    });
    fixture = TestBed.createComponent(BlockTypeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
