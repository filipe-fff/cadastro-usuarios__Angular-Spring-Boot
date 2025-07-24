import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';
import { PhoneMaskPipe } from '../../../../pipes/phone-mask.pipe';
import { PhonePlaceholderPipe } from '../../../../pipes/phone-placeholder.pipe';

@Component({
  selector: 'app-phone-list-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    PhoneMaskPipe,
    PhonePlaceholderPipe
  ],
  templateUrl: './phone-list-edit.component.html',
  styleUrl: './phone-list-edit.component.scss'
})
export class PhoneListEditComponent {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  get phoneList(): FormArray {
    return this.userForm.get("contactInformations.phoneList") as FormArray;
  }
}