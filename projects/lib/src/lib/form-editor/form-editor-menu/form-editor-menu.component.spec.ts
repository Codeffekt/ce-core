import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormEditorMenuComponent } from './form-editor-menu.component';

describe('FormEditorMenuComponent', () => {
  let component: CeFormEditorMenuComponent;
  let fixture: ComponentFixture<CeFormEditorMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CeFormEditorMenuComponent]
    });
    fixture = TestBed.createComponent(CeFormEditorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
