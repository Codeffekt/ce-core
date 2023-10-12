import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionExampleComponent } from './section-example.component';

describe('SectionExampleComponent', () => {
  let component: SectionExampleComponent;
  let fixture: ComponentFixture<SectionExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
