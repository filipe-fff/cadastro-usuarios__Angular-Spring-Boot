import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  selector: 'app-music-informations-edit',
  standalone: true,
  imports: [
    AngularMaterialModule
  ],
  templateUrl: './music-informations-edit.component.html',
  styleUrl: './music-informations-edit.component.scss'
})
export class MusicInformationsEditComponent {
  displayedColumns: string[] = ["title", "band", "genre", "isFavorite"];
}