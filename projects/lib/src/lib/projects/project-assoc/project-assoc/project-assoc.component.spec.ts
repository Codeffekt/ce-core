import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeProjectAssocComponent } from './project-assoc.component';

describe('ProjectAssocComponent', () => {
  let component: CeProjectAssocComponent;
  let fixture: ComponentFixture<CeProjectAssocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeProjectAssocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeProjectAssocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
