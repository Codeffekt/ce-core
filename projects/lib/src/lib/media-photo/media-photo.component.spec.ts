import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPhotoComponent } from './media-photo.component';

describe('MediaPhotoComponent', () => {
  let component: MediaPhotoComponent;
  let fixture: ComponentFixture<MediaPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [MediaPhotoComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
