import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user/user.interface";
import { UsersListReponse } from "../types/users-list-response";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly _httpClient = inject(HttpClient);

    // CREATE
    save(user: IUser): Observable<IUser> {
        return this._httpClient.post<IUser>("http://localhost:8081/user-registration/save", { ...user });
    }
    
    // READ
    getUsers(): Observable<UsersListReponse> {
        return this._httpClient.get<UsersListReponse>("http://localhost:8081/user-registration");
    }

    getUserById(id: string): Observable<IUser> {
        return this._httpClient.get<IUser>("http://localhost:8081/user-registration/user/" + id);
    }

    existsName(name: string): Observable<boolean> {
        return this._httpClient.post<boolean>("http://localhost:8081/user-registration/existsName", name);
    }

    existsEmail(email: string): Observable<boolean> {
        return this._httpClient.post<boolean>("http://localhost:8081/user-registration/existsEmail", email);
    }

    // UPDATE
    update(id: string, user: IUser): Observable<IUser> {
        return this._httpClient.put<IUser>("http://localhost:8081/user-registration/update/" + id, user);
    }

    // DELETE
    delete(id: string): void {
        this._httpClient.delete<void>("http://localhost:8081/user-registration/delete/" + id);
    }
}