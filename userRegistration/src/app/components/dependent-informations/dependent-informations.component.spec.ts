import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentInformationsComponent } from './dependent-informations.component';

describe('DependentInformationsComponent', () => {
  let component: DependentInformationsComponent;
  let fixture: ComponentFixture<DependentInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependentInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DependentInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
