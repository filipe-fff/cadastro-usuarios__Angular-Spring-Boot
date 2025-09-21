import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInformationComponent } from './photo-information.component';

describe('PhotoInformationComponent', () => {
  let component: PhotoInformationComponent;
  let fixture: ComponentFixture<PhotoInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
