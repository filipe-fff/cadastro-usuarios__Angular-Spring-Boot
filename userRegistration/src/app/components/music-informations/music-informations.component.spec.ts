import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicInformationsComponent } from './music-informations.component';

describe('MusicInformationsComponent', () => {
  let component: MusicInformationsComponent;
  let fixture: ComponentFixture<MusicInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
