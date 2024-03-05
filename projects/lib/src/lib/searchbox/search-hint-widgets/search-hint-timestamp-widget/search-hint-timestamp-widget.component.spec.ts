import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHintTimestampWidgetComponent } from './search-hint-timestamp-widget.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

describe('SearchHintTimestampWidgetComponent', () => {
  let component: SearchHintTimestampWidgetComponent;
  let fixture: ComponentFixture<SearchHintTimestampWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHintTimestampWidgetComponent ],
      imports: [
        MatDatepickerModule,
        MatMomentDateModule,
      ]
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
