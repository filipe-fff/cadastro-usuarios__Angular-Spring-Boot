import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatCardModule,
    MatTabsModule
  ],
  exports: [
    MatCardModule,
    MatTabsModule
  ]
})
export class AngularMaterialModule { }