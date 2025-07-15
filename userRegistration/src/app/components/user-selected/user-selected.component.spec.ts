import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectedComponent } from './user-selected.component';

describe('UserSelectedComponent', () => {
  let component: UserSelectedComponent;
  let fixture: ComponentFixture<UserSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
