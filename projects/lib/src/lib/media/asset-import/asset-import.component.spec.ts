import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetImportComponent } from './asset-import.component';

describe('AssetImportComponent', () => {
  let component: AssetImportComponent;
  let fixture: ComponentFixture<AssetImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
