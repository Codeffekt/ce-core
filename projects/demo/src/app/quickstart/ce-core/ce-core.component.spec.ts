import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeCoreComponent } from './ce-core.component';

describe('CeCoreComponent', () => {
  let component: CeCoreComponent;
  let fixture: ComponentFixture<CeCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
