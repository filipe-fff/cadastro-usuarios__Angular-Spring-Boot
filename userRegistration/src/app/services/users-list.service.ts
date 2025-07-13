import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersListService {
    private readonly _httpClient = inject(HttpClient);

    // CREATE
    save(user: any): Observable<any> {
        return this._httpClient.post<any>("http://localhost:8081/user-registration/save", { ...user });
    }
    
    // READ
    getUsers(): Observable<any[]> {
        return this._httpClient.get<any[]>("http://localhost:8081/user-registration");
    }

    getUserById(id: string): Observable<any> {
        return this._httpClient.get("http://localhost:8081/user-registration/user/" + id);
    }

    existsName(name: string): Observable<boolean> {
        return this._httpClient.post<boolean>("http://localhost:8081/user-registration/existsName", name);
    }

    existsEmail(email: string): Observable<boolean> {
        return this._httpClient.post<boolean>("http://localhost:8081/user-registration/existsEmail", email);
    }

    // UPDATE
    update(id: string, user: any): Observable<any> {
        return this._httpClient.put<any>("http://localhost:8081/user-registration/update/" + id, user);
    }

    // DELETE
    delete(id: string): void {
        this._httpClient.delete<void>("http://localhost:8081/user-registration/delete/" + id);
    }
}