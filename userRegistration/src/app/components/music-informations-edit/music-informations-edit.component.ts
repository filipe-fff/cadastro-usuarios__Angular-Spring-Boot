import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { GenresService } from '../../services/genres.service';
import { GenresListResponse } from '../../types/genres-list-response';
import { isFavoriteDisabled } from '../../utils/is-favorite-disabled';
import { Subject, takeUntil } from 'rxjs';

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
export class MusicInformationsEditComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["title", "band", "genre", "isFavorite"];
  
  dataSource = new MatTableDataSource<FormGroup>();

  genresList: GenresListResponse = [];

  @Input({ required: true }) userForm: FormGroup = {} as FormGroup;

  private readonly _destroy$ = new Subject<void>();
  private readonly _genresService = inject(GenresService);

  ngOnInit() {
    this.updateDataSource();
    this.watchMusicInformationsValueChanges();
    this.watchMusicInformationsStatusChanges();

    this.getGenres();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get musicInformations(): FormArray {
    return this.userForm.get("musicInformations") as FormArray;
  }

  private watchMusicInformationsValueChanges() {
    this.musicInformations.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.updateDataSource();
      isFavoriteDisabled(this.musicInformations);
    });
  }

  private watchMusicInformationsStatusChanges() {
    this.musicInformations.statusChanges.pipe(takeUntil(this._destroy$)).subscribe(() => this.musicInformations.markAllAsTouched());
  }

  private updateDataSource() {
    if (this.musicInformations.controls.length > 0) {
      this.dataSource.data = this.musicInformations.controls as FormGroup[];

    } else {
      this.dataSource.data = [];
    }
  }

  private getGenres() {
    this._genresService.getGenres().pipe(takeUntil(this._destroy$)).subscribe(genresResponse => this.genresList = genresResponse);
  }
}