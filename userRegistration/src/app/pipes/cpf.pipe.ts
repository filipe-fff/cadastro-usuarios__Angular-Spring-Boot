import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cpf',
    standalone: true
})
export class CpfPipe implements PipeTransform {

    transform(cpf: number, hidden: boolean = false): string {

        const cpfFormat = cpf.toString();

        if (hidden)
            return `XXX.${cpfFormat.substring(3, 6)}.XXX-${cpfFormat.substring(9)}`;

        return `${cpfFormat.substring(0, 3)}.${cpfFormat.substring(3, 6)}.${cpfFormat.substring(6, 9)}-${cpfFormat.substring(9)}`;
    }
}