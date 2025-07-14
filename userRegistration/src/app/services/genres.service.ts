import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenresListResponse } from "../types/genres-list-response";

@Injectable({
    providedIn: 'root'
})
export class GenresService {
    private readonly _httpClient = inject(HttpClient);

    getGenres(): Observable<GenresListResponse> {
        return this._httpClient.get<GenresListResponse>("http://localhost:8081/genre");
    }
}