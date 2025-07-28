import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordConfirmEqualValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control) return null;
    
    const password = control.get("password") as FormControl;
    const passwordConfirm = control.get("passwordConfirm") as FormControl;

    const hasPasswordConfirmEqual = password.value === passwordConfirm.value;

    if (hasPasswordConfirmEqual) {
        if (passwordConfirm.hasError("passwordConfirmEqualNotError")) {
            const { passwordConfirmEqualNotError, ...otherErrors } = passwordConfirm.errors || {};
            const hasOtherErrors = Object.keys(otherErrors).length > 0;
            passwordConfirm.setErrors(hasOtherErrors ? otherErrors : null);
        }

    } else {
        const otherErrors = passwordConfirm.errors || null;
        passwordConfirm.setErrors({ ...otherErrors, passwordConfirmEqualNotError: true });
    }

    return null;
};