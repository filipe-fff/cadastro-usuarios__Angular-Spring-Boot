import { Component } from '@angular/core';
import { UserInfosItemComponent } from '../../../user-infos-item/user-infos-item.component';

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [
    UserInfosItemComponent
  ],
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss'
})
export class PhoneListComponent { }