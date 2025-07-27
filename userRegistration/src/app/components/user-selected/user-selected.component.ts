import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user/user.interface';
import { UsersService } from '../../services/users.service';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { JsonPipe } from '@angular/common';
import { UserUpdateButtonsContainerComponent } from '../user-update-buttons-container/user-update-buttons-container.component';
import { FormGroup } from '@angular/forms';
import { UserFormRawValueService } from '../../services/user-form-raw-value.service';
import { convertUserFormRawValueToUser } from '../../utils/convert-user-form-raw-value-to-user';

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
  }

  onSaveButton() {
    console.log("SALVOU !!!");
    const newUser = convertUserFormRawValueToUser(this._userFormRawValueService.userFormRawValue);
    console.log("newUser =>", newUser);
  }

  onEnableSaveButton(enable: boolean) {
    this.enableSaveButton = enable;
  }

  private getUser() {
    this._activatedRoute.params.subscribe(params => this.userSelectedIndex = params["id"]);
    this._usersService.getUserById(this.userSelectedIndex as string).subscribe(userResponse => this.userSelected = userResponse);
  }
}