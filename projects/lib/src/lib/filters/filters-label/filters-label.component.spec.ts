import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersLabelComponent } from './filters-label.component';

describe('FiltersLabelComponent', () => {
  let component: FiltersLabelComponent;
  let fixture: ComponentFixture<FiltersLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
