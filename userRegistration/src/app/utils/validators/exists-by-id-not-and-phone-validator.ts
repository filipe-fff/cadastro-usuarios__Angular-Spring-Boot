import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { IPhoneToDisplay } from "../../interfaces/phone-to-display.interface";
import { UsersService } from "../../services/users.service";
import { convertPhoneToDisplayToPhone } from "../convert-phone-to-display-to-phone";

export const existsByIdNotAndPhoneValidator = (userId: string, usersService: UsersService): AsyncValidatorFn => {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control || !control.value) return of(null);

        const parentControl = control.parent as FormGroup;

        const idControl = parentControl?.get("id") as FormControl;
        const typeControl = parentControl?.get("type") as FormControl;
        const typeDescriptionControl = parentControl?.get("typeDescription") as FormControl;
        
        if (!typeControl?.value || !typeDescriptionControl?.value || !control?.value) return of(null);

        const phone = convertPhoneToDisplayToPhone({
            id: idControl.value,
            type: typeControl.value,
            typeDescription: typeDescriptionControl.value,
            number: control.value
        } as IPhoneToDisplay);

        return usersService
            .existsByIdNotAndPhone(userId, phone)
            .pipe(
                map(existsResponse => existsResponse ? { existsPhoneError: true } : null)
            );
    };
};