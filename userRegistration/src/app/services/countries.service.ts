import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private readonly _httpClient = inject(HttpClient);

    getCountries(): Observable<any> {
        return this._httpClient.get<any>("https://countriesnow.space/api/v0.1/countries/positions");
    }
}