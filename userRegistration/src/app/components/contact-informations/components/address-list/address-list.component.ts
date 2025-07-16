import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { UserInfosItemComponent } from '../../../user-infos-item/user-infos-item.component';
import { AddressListToDisplay } from '../../../../types/address-list-to-display';
import { prepareAddressListToDisplay } from '../../../../utils/prepare-address-to-display-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [
    CommonModule,
    UserInfosItemComponent
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnChanges {
  addressListToDisplay: AddressListToDisplay = [];

  @Input({ required: true }) addressList: AddressList = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.onPrepareAddressListToDisplay();
  }

  onPrepareAddressListToDisplay() {
    if (!this.addressList) return;

    this.addressListToDisplay = [];
    prepareAddressListToDisplay(true, this.addressList, (address) => {
      this.addressListToDisplay.push(address);
    });
  }
}