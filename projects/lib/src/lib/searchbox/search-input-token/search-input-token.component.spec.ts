import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputTokenComponent } from './search-input-token.component';

describe('SearchInputTokenComponent', () => {
  let component: SearchInputTokenComponent;
  let fixture: ComponentFixture<SearchInputTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
