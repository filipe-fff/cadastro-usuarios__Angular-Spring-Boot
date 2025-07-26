import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'yesNo',
    standalone: true
})
export class YesNoPipe implements PipeTransform {

    transform(value: string | boolean): string {
        return typeof value === "string" ? value : value ? "Sim" : "Não";
    }
}