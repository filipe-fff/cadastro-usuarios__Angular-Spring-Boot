import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatesService {
    private readonly _httpClient = inject(HttpClient);

    getStates(countryName: string): Observable<any> {
        return this._httpClient.post<any>("https://countriesnow.space/api/v0.1/countries/states", { country: countryName });
    }
}