import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmMatDialog } from '../../interfaces/confirm-mat-dialog.interface';

@Component({
  selector: 'app-confirm-mat-dialog',
  standalone: true,
  imports: [
    AngularMaterialModule
  ],
  templateUrl: './confirm-mat-dialog.component.html',
  styleUrl: './confirm-mat-dialog.component.scss'
})
export class ConfirmMatDialogComponent {
  
  data: IConfirmMatDialog = inject(MAT_DIALOG_DATA);
}