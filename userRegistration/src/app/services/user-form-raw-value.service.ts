import { Injectable } from "@angular/core";
import { IUserForm } from "../interfaces/user-form/user-form.interface";

@Injectable({
    providedIn: 'root'
})
export class UserFormRawValueService {
    userFormRawValue: IUserForm = {} as IUserForm;
}