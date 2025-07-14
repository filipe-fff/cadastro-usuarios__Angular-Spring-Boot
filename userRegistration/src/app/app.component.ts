import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CountriesService } from './services/countries.service';

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
  $countriesList: Observable<any> = of({});

  private readonly _countriesListService = inject(CountriesService);

  ngOnInit(): void {
    this.$countriesList = this._countriesListService.getCountries();
  }
}