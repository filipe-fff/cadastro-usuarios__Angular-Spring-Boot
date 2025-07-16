import { Component, inject, Input, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MusicsList } from '../../types/musics-list';
import { GenrePipe } from '../../pipes/genre.pipe';
import { GenresService } from '../../services/genres.service';
import { GenresListResponse } from '../../types/genres-list-response';
import { YesNoPipe } from '../../pipes/yes-no-pipe';

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
export class MusicInformationsComponent implements OnInit {
  displayedColumns: string[] = ["title", "band", "genre", "isFavorite"];
  genresList: GenresListResponse = [];

  private readonly _genresService = inject(GenresService);

  @Input({ required: true }) musicsList: MusicsList = [];

  ngOnInit() {
    this._genresService.getGenres().subscribe(genresResponse => this.genresList = genresResponse);
  }
}