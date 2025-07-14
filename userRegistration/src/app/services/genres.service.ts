import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenresService {
    private readonly _httpClient = inject(HttpClient);

    getGenres(): Observable<any> {
        return this._httpClient.get<any>("http://localhost:8081/genre");
    }
}