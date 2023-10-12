import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHintTimestampWidgetComponent } from './search-hint-timestamp-widget.component';

describe('SearchHintTimestampWidgetComponent', () => {
  let component: SearchHintTimestampWidgetComponent;
  let fixture: ComponentFixture<SearchHintTimestampWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHintTimestampWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHintTimestampWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
