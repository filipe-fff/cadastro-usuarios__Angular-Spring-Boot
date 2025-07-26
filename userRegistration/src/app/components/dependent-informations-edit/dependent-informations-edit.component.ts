import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { buttonStylePipe } from '../../pipes/button-style.pipe';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-dependent-informations-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    buttonStylePipe
  ],
  templateUrl: './dependent-informations-edit.component.html',
  styleUrl: './dependent-informations-edit.component.scss'
})
export class DependentInformationsEditComponent {
  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  @Output("onAddDependent") onAddDependentEmitt = new EventEmitter<void>();
  @Output("onRemoveDependent") onRemoveDependentEmitt = new EventEmitter<number>();

  get dependentInformations(): FormArray {
    return this.userForm.get("dependentInformations") as FormArray;
  }

  onAddDependent() {
    this.onAddDependentEmitt.emit();
  }

  onRemoveDependent(id: number) {
    this.onRemoveDependentEmitt.emit(id);
  }
}