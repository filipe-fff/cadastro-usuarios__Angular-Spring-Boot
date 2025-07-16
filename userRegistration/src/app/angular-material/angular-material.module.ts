import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    MatCardModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    MatCardModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class AngularMaterialModule { }