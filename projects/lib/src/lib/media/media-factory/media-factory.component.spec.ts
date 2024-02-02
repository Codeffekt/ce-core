import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFactoryComponent } from './media-factory.component';

describe('MediaFactoryComponent', () => {
  let component: MediaFactoryComponent;
  let fixture: ComponentFixture<MediaFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
