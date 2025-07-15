import { Component, Input } from '@angular/core';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-contact-informations',
  standalone: true,
  imports: [
    PhoneListComponent
  ],
  templateUrl: './contact-informations.component.html',
  styleUrl: './contact-informations.component.scss'
})
export class ContactInformationsComponent {
  @Input({ required: true }) userSelected: IUser = {} as IUser;
}