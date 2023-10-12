import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTokenPartComponent } from './search-token-part.component';

describe('SearchTokenPartComponent', () => {
  let component: SearchTokenPartComponent;
  let fixture: ComponentFixture<SearchTokenPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTokenPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTokenPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
