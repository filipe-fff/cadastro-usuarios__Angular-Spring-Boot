import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { IPhoneToDisplay } from "../../interfaces/phone-to-display.interface";
import { UsersService } from "../../services/users.service";
import { convertPhoneToDisplayToPhone } from "../convert-phone-to-display-to-phone";

export const existsByIdNotAndPhoneValidator = (userId: string, usersService: UsersService): AsyncValidatorFn => {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control || !control.value) return of(null);

        const idControl = control.get("id") as FormControl;
        const typeControl = control.get("type") as FormControl;
        const typeDescriptionControl = control.get("typeDescription") as FormControl;
        const numberControl = control.get("number") as FormControl;

        if (!idControl.value || !typeControl.value || !typeDescriptionControl.value || !numberControl.value) return of(null);

        const phone = convertPhoneToDisplayToPhone({
            id: idControl.value,
            type: typeControl.value,
            typeDescription: typeDescriptionControl.value,
            number: numberControl.value
        } as IPhoneToDisplay);

        return usersService
            .existsByIdNotAndPhone(userId, phone)
            .pipe(
                map(existsResponse => {

                    if (existsResponse) {
                        const otherErrors = numberControl.errors || null;
                        numberControl.setErrors({ ...otherErrors, existsPhoneError: true });
                    } else {
                        if (numberControl.hasError("existsPhoneError")) {
                            const { existsPhoneError, ...otherErrors } = numberControl.errors || {};
                            const hasOtherErrors = Object.keys(otherErrors).length > 0;
                            numberControl.setErrors(hasOtherErrors ? otherErrors : null);
                        }
                    }

                    return null;
                })
            );
    };
};