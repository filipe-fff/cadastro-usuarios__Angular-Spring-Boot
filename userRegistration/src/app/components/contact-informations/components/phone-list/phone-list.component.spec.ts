import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneListComponent } from './phone-list.component';

describe('PhoneListComponent', () => {
  let component: PhoneListComponent;
  let fixture: ComponentFixture<PhoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
