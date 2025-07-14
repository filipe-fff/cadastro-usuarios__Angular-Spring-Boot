import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ICountriesResponse } from "../interfaces/countries-response/countries-response.interface";
import { CountriesList } from "../types/countries-list";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private readonly _httpClient = inject(HttpClient);

    getCountries(): Observable<CountriesList> {
        return this._httpClient
            .get<ICountriesResponse>("https://countriesnow.space/api/v0.1/countries/positions")
            .pipe(map(countriesResponse => countriesResponse.data));
    }
}