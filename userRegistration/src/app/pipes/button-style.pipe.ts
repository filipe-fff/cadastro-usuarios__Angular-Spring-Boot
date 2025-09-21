import { Pipe, PipeTransform } from "@angular/core";
import { buttonColorTypeDescriptionMap } from "../utils/button-color-type-description-map";
import { ButtonColorTypeEnum } from "../enums/button-color-type.enum";

@Pipe({
    name: 'buttonStyle',
    standalone: true
})
export class ButtonStylePipe implements PipeTransform {

    transform(colorType: string): string {
        const color = buttonColorTypeDescriptionMap[colorType];
        const style = "rounded-md px-3 py-2 text-white text-lg font-medium leading-5 " + color;

        return style;
    }
}