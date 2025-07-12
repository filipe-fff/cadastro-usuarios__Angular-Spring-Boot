import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersListService {
    private readonly _httpClient = inject(HttpClient);

    getUsers(): Observable<any[]> {
        return this._httpClient.get<any[]>("http://localhost:8081/user-registration");
    }
}