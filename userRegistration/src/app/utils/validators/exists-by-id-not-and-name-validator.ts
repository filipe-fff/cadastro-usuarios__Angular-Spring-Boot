import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { UsersService } from "../../services/users.service";

export const existsByIdNotAndNameValidator = (usersService: UsersService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control) return of(null);

        const idControl = control.get("id") as FormControl;
        const nameControl = control.get("name") as FormControl;

        if(!idControl || !nameControl) return of(null);

        const id = idControl.value;
        const name = nameControl.value;

        if (!id || !name) return of(null);

        return usersService.
            existsByIdNotAndName(id, name)
            .pipe(
                map((existsResponse) => {
                    if (existsResponse) {
                        const otherErrors = nameControl.errors || null;
                        nameControl.setErrors({ ...otherErrors, existsNameError: true });
                    } else {
                        if (nameControl.hasError("existsNameError")) {
                            const { existsNameError, ...otherErrors } = nameControl.errors || {};
                            const hasOtherErrors = Object.keys(otherErrors).length > 0;
                            nameControl.setErrors(hasOtherErrors ? otherErrors : null);
                        }
                    }

                    return null
                }));
    };
};