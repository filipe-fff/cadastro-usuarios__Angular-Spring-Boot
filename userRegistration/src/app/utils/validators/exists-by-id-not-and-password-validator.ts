import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { map, Observable, of, tap } from "rxjs";

export const existsByIdNotAndPasswordValidator = (usersService: UsersService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        const idControl = control.get("id") as FormControl;
        const passwordControl = control.get("password") as FormControl;

        if (!idControl || !passwordControl) return of(null);

        const id = idControl.value;
        const password = passwordControl.value;

        if (!id || !password) return of(null);

        return usersService
            .existsByIdNotAndPassword(id, password)
            .pipe(
                map(existsResponse => {
                    
                    if (existsResponse) {
                        const otherErrors = passwordControl.errors || null;
                        passwordControl.setErrors({ ...otherErrors, existsPasswordError: true });
                    } else {
                        if (passwordControl.hasError("existsPasswordError")) {
                            const { existsPasswordError, ...otherErrors } = passwordControl.errors || {};
                            const hasOtherErrors = Object.keys(otherErrors).length > 0;
                            passwordControl.setErrors( hasOtherErrors ? otherErrors : null );
                        }
                    }

                    return null;
                })
            );
    };
};