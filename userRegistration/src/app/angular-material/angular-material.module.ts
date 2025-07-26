import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  exports: [
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule { }