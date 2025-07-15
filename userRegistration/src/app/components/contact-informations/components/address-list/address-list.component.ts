import { Component, Input } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { UserInfosItemComponent } from '../../../user-infos-item/user-infos-item.component';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [
    UserInfosItemComponent
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent {
  @Input({ required: true }) addressList: AddressList = [];
}