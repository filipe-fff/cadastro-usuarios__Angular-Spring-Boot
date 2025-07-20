import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-informations-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnInit {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  ngOnInit(): void {
    console.log("==========>>>>>>>>>", this.userForm.value);
  }
}