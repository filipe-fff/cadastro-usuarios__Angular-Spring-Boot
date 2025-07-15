import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserInfosItemComponent } from '../user-infos-item/user-infos-item.component';

@Component({
  selector: 'app-general-informations',
  standalone: true,
  imports: [
    UserInfosItemComponent
  ],
  templateUrl: './general-informations.component.html',
  styleUrl: './general-informations.component.scss'
})
export class GeneralInformationsComponent {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
}