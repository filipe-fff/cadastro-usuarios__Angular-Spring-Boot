import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneList } from '../../../../types/phone-list';
import { PhoneListToDisplay } from '../../../../types/phone-list-to-display';
import { preparePhoneListToDisplay } from '../../../../utils/prepare-phone-list-to-display';
import { UserInfosItemComponent } from '../../../user-infos-item/user-infos-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [
    CommonModule,
    UserInfosItemComponent
  ],
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss'
})
export class PhoneListComponent implements OnChanges {
  phoneToDisplayList: PhoneListToDisplay = [];

  @Input({ required: true }) phoneList: PhoneList = [];

  ngOnChanges(changes: SimpleChanges) {
    this.onPreparePhoneToDisplayList();
  }

  onPreparePhoneToDisplayList() {
    this.phoneToDisplayList = [];
    preparePhoneListToDisplay(true, this.phoneList, (phone) => {
      this.phoneToDisplayList.push(phone);
    });
  }
}