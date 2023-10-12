import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFactoryComponent } from './forms-factory.component';

describe('FormsFactoryComponent', () => {
  let component: FormsFactoryComponent;
  let fixture: ComponentFixture<FormsFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
