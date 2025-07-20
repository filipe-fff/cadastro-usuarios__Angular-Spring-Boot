import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicInformationsEditComponent } from './music-informations-edit.component';

describe('MusicInformationsEditComponent', () => {
  let component: MusicInformationsEditComponent;
  let fixture: ComponentFixture<MusicInformationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicInformationsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicInformationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
