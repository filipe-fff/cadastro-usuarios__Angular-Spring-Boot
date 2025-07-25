import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-music-informations-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './music-informations-edit.component.html',
  styleUrl: './music-informations-edit.component.scss'
})
export class MusicInformationsEditComponent implements OnInit {
  displayedColumns: string[] = ["title", "band", "genre", "isFavorite"];
  
  dataSource = new MatTableDataSource<FormGroup>;

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  ngOnInit() {
    this.dataSource.data = this.musicInformations.value;
  }

  get musicInformations(): FormArray {
    return this.userForm.get("musicInformations") as FormArray;
  }
}