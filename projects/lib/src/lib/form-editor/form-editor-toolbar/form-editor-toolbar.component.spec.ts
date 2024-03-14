import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormEditorToolbarComponent } from './form-editor-toolbar.component';

describe('FormEditorToolbarComponent', () => {
  let component: CeFormEditorToolbarComponent;
  let fixture: ComponentFixture<CeFormEditorToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CeFormEditorToolbarComponent]
    });
    fixture = TestBed.createComponent(CeFormEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
