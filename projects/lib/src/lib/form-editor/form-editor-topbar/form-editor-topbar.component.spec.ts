import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeFormEditorTopbarComponent } from './form-editor-topbar.component';

describe('FormEditorTopbarComponent', () => {
  let component: CeFormEditorTopbarComponent;
  let fixture: ComponentFixture<CeFormEditorTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CeFormEditorTopbarComponent]
    });
    fixture = TestBed.createComponent(CeFormEditorTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
