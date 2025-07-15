import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'dateFormat',
    standalone: true
})
export class DateFormatPipe implements PipeTransform {

    transform(date: string): string {
        if (!date) return "";

        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    }
}