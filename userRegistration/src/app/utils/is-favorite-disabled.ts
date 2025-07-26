import { FormArray, FormControl } from "@angular/forms";

export const isFavoriteDisabled = (musicsForm: FormArray) => {

    const hasAnyFavoriteChecked = musicsForm.controls.find(controlChild => {
        const isFavoriteControl = controlChild.get("isFavorite") as FormControl;
        return isFavoriteControl.value;
    });

    musicsForm.controls.forEach(controlGroup => {

        const isFavoriteControl = controlGroup.get("isFavorite") as FormControl;

        if (hasAnyFavoriteChecked && !isFavoriteControl.value)
            isFavoriteControl.disable({ emitEvent: false });

         else
            isFavoriteControl.enable({ emitEvent: false });
    });
};