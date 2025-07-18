import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentInformationsEditComponent } from './dependent-informations-edit.component';

describe('DependentInformationsEditComponent', () => {
  let component: DependentInformationsEditComponent;
  let fixture: ComponentFixture<DependentInformationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependentInformationsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DependentInformationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
