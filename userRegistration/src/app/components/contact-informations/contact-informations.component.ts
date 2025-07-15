import { Component, Input } from '@angular/core';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { IUser } from '../../interfaces/user/user.interface';
import { AddressListComponent } from './components/address-list/address-list.component';

@Component({
  selector: 'app-contact-informations',
  standalone: true,
  imports: [
    PhoneListComponent,
    AddressListComponent
  ],
  templateUrl: './contact-informations.component.html',
  styleUrl: './contact-informations.component.scss'
})
export class ContactInformationsComponent {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
}