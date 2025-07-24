import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-list-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './address-list-edit.component.html',
  styleUrl: './address-list-edit.component.scss'
})
export class AddressListEditComponent {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  get addressList(): FormArray {
    return this.userForm.get("contactInformations.addressList") as FormArray;
  }
}