import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { UsersService } from '../../services/users.service';
import { convertUserUpdateFormRawValueToUserUpdate } from '../../utils/convert-user-update-form-raw-value-to-user-update';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { UserUpdateButtonsContainerComponent } from '../user-update-buttons-container/user-update-buttons-container.component';

@Component({
  selector: 'app-user-selected',
  standalone: true,
  imports: [
    UserUpdateButtonsContainerComponent,
    UserInformationsContainerComponent
  ],
  templateUrl: './user-selected.component.html',
  styleUrl: './user-selected.component.scss'
})
export class UserSelectedComponent implements OnInit {
  userSelected: IUser = {} as IUser;
  userSelectedIndex!: string;

  isInEditMode: boolean = true;
  enableSaveButton: boolean = false;
  userFormFirstValueChange: boolean = false;
  
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _usersService = inject(UsersService);
  private readonly _userFormRawValueService = inject(UserFormRawValueService);

  ngOnInit() {
    this.getUser();
  }

  onEditButton() {
    this.isInEditMode = true;
  }

  onCancelButton() {
    this.isInEditMode = false;

    this.userSelected = structuredClone(this.userSelected);
  }

  onSaveButton() {
    const newUser = convertUserUpdateFormRawValueToUserUpdate(this._userFormRawValueService.userFormRawValue);
    this._usersService.update(newUser).subscribe({
      next: () => console.log("Atualizado com sucesso!"),
      error: (err) => console.log(err)
    });
  }

  onEnableSaveButton(enable: boolean) {
    setTimeout(() => this.enableSaveButton = enable, 0);
  }

  onUserFormFirstChange() {
    console.log("onUserFormFirstValueChange");

    this.userFormFirstValueChange = true;
  }

  private getUser() {
    this._activatedRoute.params.subscribe(params => this.userSelectedIndex = params["id"]);
    this._usersService.getUserById(this.userSelectedIndex as string).subscribe(userResponse => this.userSelected = userResponse);
  }
}