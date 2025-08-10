import { Component, OnInit } from '@angular/core';
import { ICanDeactivateWithDialog } from '../../interfaces/can-deactivate-with-dialog.interface';
import { UserInformationsContainerComponent } from '../user-informations-container/user-informations-container.component';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    UserInformationsContainerComponent
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit, ICanDeactivateWithDialog {
  newUser: IUser = {} as IUser;
  isInEditMode: boolean = true;
  shouldMarkUserFormTouchedAndValidity: boolean = false;

  ngOnInit(): void { }
}