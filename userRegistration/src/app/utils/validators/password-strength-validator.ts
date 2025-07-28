import zxcvbn from "zxcvbn";

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordStrengthValidator:ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    
    if (!control) null;
    
    const password = control.getRawValue();
    const strength = zxcvbn(password || "");

    if (strength.score === 4) return null;

    return ({ passwordStrengthError: true });
};