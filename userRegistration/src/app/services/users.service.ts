import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../interfaces/user/user.interface";
import { UsersListReponse } from "../types/users-list-response";
import { IUserUpdate } from "../interfaces/user-update/user-update.interface";
import { IPhone } from "../interfaces/user/phone.interface";
import { IUserCreate } from "../interfaces/user-create/user-create.interface";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly _httpClient = inject(HttpClient);

    // CREATE
    save(user: IUserCreate): Observable<IUserCreate> {
        return this._httpClient.post<IUserCreate>("http://localhost:8081/user-registration/save", user);
    }
    
    // READ
    getUsers(): Observable<UsersListReponse> {
        return this._httpClient.get<UsersListReponse>("http://localhost:8081/user-registration");
    }

    getUserById(id: string): Observable<IUser> {
        return this._httpClient.get<IUser>("http://localhost:8081/user-registration/user/" + id);
    }

    existsByIdNotAndName(id: string | null, name: string): Observable<boolean> {
        const headers = { "Content-Type": "application/json" };
        const body = name;

        if (id)
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-name/" + id, body, { headers });
        else
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-name", body, { headers });
    }

    existsByIdNotAndEmail(id: string | null, email: string): Observable<boolean> {
        const headers = { "Content-Type": "application/json" };
        const body = email;
        
        if (id)
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-email/" + id, body, { headers });
        else
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-email", body, { headers });
    }

    existsByIdNotAndPassword(id: string | null, password: string): Observable<boolean> {
        const headers = { "Content-Type": "application/json" };
        const body = password;

        if (id)
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-password/" + id, body, { headers });
        else
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-password", body, { headers });
    }

    existsByIdNotAndPhone(userId: string | null, phone: IPhone): Observable<boolean> {
        const headers = { "Content-Type": "application/json" };
        const body = phone;

        if (userId)
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-phone/" + userId, body, { headers });
        else
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-phone", body, { headers });

    }

    existsByIdNotAndDocument(id: string | null, document: number | null): Observable<boolean> {
        const headers = { "Content-Type": "application/json" };
        const body = document;

        if (id)
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-document/" + id, body, { headers });
        else
            return this._httpClient.put<boolean>("http://localhost:8081/user-registration/exists-document", body, { headers });
    }

    // UPDATE
    update(user: IUserUpdate): Observable<IUserUpdate> {
        return this._httpClient.post<IUserUpdate>("http://localhost:8081/user-registration/update", user);
    }

    // DELETE
    delete(id: string): Observable<void> {
        return this._httpClient.delete<void>("http://localhost:8081/user-registration/delete/" + id);
    }
}