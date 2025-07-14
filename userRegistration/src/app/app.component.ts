import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CountriesService } from './services/countries.service';
import { CountriesList } from './types/countries-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  $countriesList: Observable<CountriesList> = of([]);

  private readonly _countriesListService = inject(CountriesService);

  ngOnInit(): void {
    this._countriesListService.getCountries().subscribe(console.log);
  }
}