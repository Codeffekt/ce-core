import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHintDropdownComponent } from './search-hint-dropdown.component';

describe('SearchHintDropdownComponent', () => {
  let component: SearchHintDropdownComponent;
  let fixture: ComponentFixture<SearchHintDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHintDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHintDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
