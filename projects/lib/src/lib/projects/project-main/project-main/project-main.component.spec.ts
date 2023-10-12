import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeProjectMainComponent } from './project-main.component';

describe('ProjectMainComponent', () => {
  let component: CeProjectMainComponent;
  let fixture: ComponentFixture<CeProjectMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeProjectMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeProjectMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
