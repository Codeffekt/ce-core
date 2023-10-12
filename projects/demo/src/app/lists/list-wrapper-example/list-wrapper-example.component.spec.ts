import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWrapperExampleComponent } from './list-wrapper-example.component';

describe('ListWrapperExampleComponent', () => {
  let component: ListWrapperExampleComponent;
  let fixture: ComponentFixture<ListWrapperExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWrapperExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWrapperExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
