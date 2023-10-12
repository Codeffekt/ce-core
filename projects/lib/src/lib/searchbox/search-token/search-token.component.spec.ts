import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTokenComponent } from './search-token.component';

describe('SearchTokenComponent', () => {
  let component: SearchTokenComponent;
  let fixture: ComponentFixture<SearchTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
