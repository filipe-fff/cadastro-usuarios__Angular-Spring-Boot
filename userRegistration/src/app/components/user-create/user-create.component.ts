import { Component, inject, OnInit } from '@angular/core';
import { ICanDeactivateWithDialog } from '../../interfaces/can-deactivate-with-dialog.interface';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { IUser } from '../../interfaces/user/user.interface';
import { UserSaveButtonsContainerComponent } from '../user-save-buttons-container/user-save-buttons-container.component';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    UserInformationsContainerComponent,
    UserSaveButtonsContainerComponent
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit, ICanDeactivateWithDialog {
  newUser: IUser = {} as IUser;
  isInEditMode: boolean = true;
  shouldMarkUserFormTouchedAndValidity: boolean = false;

  private readonly _userFormRawValue = inject(UserFormRawValueService);

  ngOnInit(): void {
    this.getNewUser();
  }

  getNewUser() {
    this.newUser = ({
      id: "",
      name: "",
      photoUrl: "",
      email: "",
      password: "",
      country: "",
      state: "",
      maritalStatus: null,
      monthlyIncome: null,
      birthDate: "",
      phoneList: [],
      addressList: [],
      dependents: [],
      musics: []
    }) as IUser;
  }

  showUserFormRawValue() {
    console.log(this._userFormRawValue.userFormRawValue);
  }
}