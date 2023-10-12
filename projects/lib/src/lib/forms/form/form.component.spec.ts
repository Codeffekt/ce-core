import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: CeFormComponent;
  let fixture: ComponentFixture<CeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CeFormComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
