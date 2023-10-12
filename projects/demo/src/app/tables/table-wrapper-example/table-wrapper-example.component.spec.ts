import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWrapperExampleComponent } from './table-wrapper-example.component';

describe('TableWrapperExampleComponent', () => {
  let component: TableWrapperExampleComponent;
  let fixture: ComponentFixture<TableWrapperExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWrapperExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWrapperExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
