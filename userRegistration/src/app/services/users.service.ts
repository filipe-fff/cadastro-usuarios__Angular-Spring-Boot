import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user/user.interface";
import { UsersListReponse } from "../types/users-list-response";
import { IUserUpdate } from "../interfaces/user-update/user-update.interface";

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

    existsByIdNotAndName(id: string, name: string): Observable<boolean> {
        return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-name/" + id, name);
    }

    existsByIdNotAndEmail(id: string, email: string): Observable<boolean> {
        return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-email/" + id, email);
    }

    existsByIdNotAndPassword(id: string, password: string): Observable<boolean> {
        return this._httpClient.put<boolean>('http://localhost:8081/user-registration/exists-password/' + id, password);
    }

    // UPDATE
    update(user: IUserUpdate): Observable<IUserUpdate> {
        return this._httpClient.post<IUserUpdate>("http://localhost:8081/user-registration/update", user);
    }

    // DELETE
    delete(id: string): void {
        this._httpClient.delete<void>("http://localhost:8081/user-registration/delete/" + id);
    }
}