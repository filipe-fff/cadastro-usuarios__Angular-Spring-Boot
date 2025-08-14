import { Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MusicsList } from '../../types/musics-list';
import { GenrePipe } from '../../pipes/genre.pipe';
import { GenresService } from '../../services/genres.service';
import { GenresListResponse } from '../../types/genres-list-response';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
import { MusicsListToDisplay } from '../../types/musics-list-to-display';
import { prepareMusicsListToDisplay } from '../../utils/prepare-musics-list-to-display';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-music-informations',
  standalone: true,
  imports: [
    AngularMaterialModule,
    GenrePipe,
    YesNoPipe
  ],
  templateUrl: './music-informations.component.html',
  styleUrl: './music-informations.component.scss'
})
export class MusicInformationsComponent implements OnInit, OnChanges, OnDestroy {
  musicsListToDisplay: MusicsListToDisplay = [];

  displayedColumns: string[] = ["title", "band", "genre", "isFavorite"];
  genresList: GenresListResponse = [];

  private readonly _destroy$ = new Subject<void>();
  private readonly _genresService = inject(GenresService);

  @Input({ required: true }) musicsList: MusicsList = [];

  ngOnInit() {
    this.getGenres();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.onPrepareMusicsListToDisplay();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onPrepareMusicsListToDisplay() {
    this.musicsListToDisplay = [];

    prepareMusicsListToDisplay(true, this.musicsList, (music) => {
      this.musicsListToDisplay.push(music);
    });
  }

  getGenres() {
    this._genresService.getGenres().pipe(takeUntil(this._destroy$)).subscribe(genresResponse => this.genresList = genresResponse);
  }
}