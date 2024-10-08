import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootChooserDialogComponent } from './root-chooser-dialog.component';

describe('RootChooserDialogComponent', () => {
  let component: RootChooserDialogComponent;
  let fixture: ComponentFixture<RootChooserDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RootChooserDialogComponent]
    });
    fixture = TestBed.createComponent(RootChooserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
