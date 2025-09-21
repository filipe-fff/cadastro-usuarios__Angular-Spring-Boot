import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInformationEditComponent } from './photo-information-edit.component';

describe('PhotoInformationEditComponent', () => {
  let component: PhotoInformationEditComponent;
  let fixture: ComponentFixture<PhotoInformationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoInformationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotoInformationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
