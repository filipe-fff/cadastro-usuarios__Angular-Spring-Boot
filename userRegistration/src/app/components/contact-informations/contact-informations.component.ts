import { Component } from '@angular/core';
import { PhoneListComponent } from './components/phone-list/phone-list.component';

@Component({
  selector: 'app-contact-informations',
  standalone: true,
  imports: [
    PhoneListComponent
  ],
  templateUrl: './contact-informations.component.html',
  styleUrl: './contact-informations.component.scss'
})
export class ContactInformationsComponent { }