import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { UsersService } from "../../services/users.service";
import { map, Observable, of, tap } from "rxjs";

export const existsByIdNotAndPasswordValidator = (usersService: UsersService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if (!control) return of(null);

        const parentControl = control.parent as FormGroup;

        const idControl = parentControl?.get("id") as FormControl;

        if (!idControl) return of(null);

        const id = idControl.value;
        const password = control.value;

        if (!password) return of(null);

        return usersService
            .existsByIdNotAndPassword(id, password)
            .pipe(
                map(existsResponse => existsResponse ? { existsPasswordError: true } : null)
            );
    };
};