import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormEditorComponent } from './form-editor.component';

describe('FormEditorComponent', () => {
  let component: CeFormEditorComponent;
  let fixture: ComponentFixture<CeFormEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CeFormEditorComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeFormEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
