import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfosItemComponent } from './user-infos-item.component';

describe('UserInfosItemComponent', () => {
  let component: UserInfosItemComponent;
  let fixture: ComponentFixture<UserInfosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfosItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInfosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
