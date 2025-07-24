import { Component, Input } from '@angular/core';
import { PhoneListEditComponent } from './components/phone-list-edit/phone-list-edit.component';
import { AddressListEditComponent } from './components/address-list-edit/address-list-edit.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-informations-edit',
  standalone: true,
  imports: [
    PhoneListEditComponent,
    AddressListEditComponent
  ],
  templateUrl: './contact-informations-edit.component.html',
  styleUrl: './contact-informations-edit.component.scss'
})
export class ContactInformationsEditComponent {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;
}