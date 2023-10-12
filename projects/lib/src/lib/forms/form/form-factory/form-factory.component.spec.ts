import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormFactoryComponent } from './form-factory.component';

describe('FormFactoryComponent', () => {
  let component: CeFormFactoryComponent;
  let fixture: ComponentFixture<CeFormFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeFormFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeFormFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
