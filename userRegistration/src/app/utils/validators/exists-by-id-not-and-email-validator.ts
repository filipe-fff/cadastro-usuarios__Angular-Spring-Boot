import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { map, Observable, of } from "rxjs";

export const existsByIdNotAndEmailValidator = (usersService: UsersService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        const idControl = control.get("id") as FormControl;
        const emailControl = control.get("email") as FormControl;

        if (!idControl || !emailControl) return of(null);

        const id = idControl.value;
        const email = emailControl.value;

        if (!id || !email) return of(null);

        return usersService
            .existsByIdNotAndEmail(id, email)
            .pipe(
                map(existsResponse => {
                    if (existsResponse) {
                        const otherErrors = emailControl.errors || null;
                        emailControl.setErrors({ ...otherErrors, existsEmailError: true });
                    } else {
                        if (emailControl.hasError("existsEmailError")) {
                            const { existsEmailError, ...otherErrors } = emailControl.errors || {};
                            const hasOtherErrors = Object.keys(otherErrors).length > 0;
                            emailControl.setErrors(hasOtherErrors ? otherErrors : null);
                        }
                    }

                    return null;
            }));
    };
};