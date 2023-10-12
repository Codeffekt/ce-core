import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeIllustrationComponent } from './illustration.component';

describe('SystraIllustrationComponent', () => {
  let component: CeIllustrationComponent;
  let fixture: ComponentFixture<CeIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeIllustrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
