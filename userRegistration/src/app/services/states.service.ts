import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { StatesList } from "../types/states-list";
import { IStatesResponse } from "../interfaces/states-response/states-response.interface";

@Injectable({
    providedIn: 'root'
})
export class StatesService {
    private readonly _httpClient = inject(HttpClient);

    getStates(countryName: string): Observable<StatesList> {
        return this._httpClient
            .post<IStatesResponse>("https://countriesnow.space/api/v0.1/countries/states", { country: countryName })
            .pipe(map(statesResponse => statesResponse.data.states));
    }
}