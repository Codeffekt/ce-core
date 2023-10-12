import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeCoreDataComponent } from './ce-core-data.component';

describe('CeCoreDataComponent', () => {
  let component: CeCoreDataComponent;
  let fixture: ComponentFixture<CeCoreDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeCoreDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeCoreDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
