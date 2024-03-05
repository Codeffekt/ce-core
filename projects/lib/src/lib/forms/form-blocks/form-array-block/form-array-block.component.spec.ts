import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayBlockComponent } from './form-array-block.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('FormArrayBlockComponent', () => {
  let component: FormArrayBlockComponent;
  let fixture: ComponentFixture<FormArrayBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FormArrayBlockComponent],
    teardown: { destroyAfterEach: false },
    imports: [
      MatDialogModule
    ]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
