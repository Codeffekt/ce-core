import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeAdminComponent } from './ce-admin.component';

describe('CeAdminComponent', () => {
  let component: CeAdminComponent;
  let fixture: ComponentFixture<CeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
