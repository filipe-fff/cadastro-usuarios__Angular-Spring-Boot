import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';
import { Subject, takeUntil } from 'rxjs';

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
export class AddressListEditComponent implements OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  ngOnInit() {
    this.watchAddressListStatusChanges();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get addressList(): FormArray {
    return this.userForm.get("contactInformations.addressList") as FormArray;
  }

  private watchAddressListStatusChanges() {
    this.addressList.statusChanges.pipe(takeUntil(this._destroy$)).subscribe(() => this.addressList.markAllAsTouched());
  }
}