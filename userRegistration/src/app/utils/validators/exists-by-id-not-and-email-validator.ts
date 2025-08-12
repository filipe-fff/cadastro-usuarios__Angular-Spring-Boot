import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { map, Observable, of } from "rxjs";

export const existsByIdNotAndEmailValidator = (usersService: UsersService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control) return of(null);

        const parentControl = control.parent as FormGroup;

        const idControl = parentControl?.get("id") as FormControl;

        if (!idControl) return of(null);

        const id = idControl.value;
        const email = control.value;

        return usersService
            .existsByIdNotAndEmail(id, email)
            .pipe(
                map(existsResponse => existsResponse ? { existsEmailError: true } : null));
    };
};