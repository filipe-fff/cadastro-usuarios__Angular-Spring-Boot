import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cpf',
    standalone: true
})
export class CpfPipe implements PipeTransform {

    transform(cpf: string): string {

        return `XXX.${cpf.substring(3, 6)}.XXX-${cpf.substring(9, 11)}`;
    }
}