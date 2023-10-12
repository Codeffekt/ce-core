import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsQueryComponent } from './forms-query.component';

describe('FormsQueryComponent', () => {
  let component: FormsQueryComponent;
  let fixture: ComponentFixture<FormsQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
