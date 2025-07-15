import { Pipe, PipeTransform } from "@angular/core";
import { maritalStatusDescriptionMap } from "../utils/marital-status-description-map";
import { MaritaStatusEnum } from "../enums/marital-status.enum";

@Pipe({
    name: 'maritalStatus',
    standalone: true
})
export class MaritalStatusPipe implements PipeTransform {
    transform(maritalStatusType: number): string {
        return maritalStatusDescriptionMap[maritalStatusType as MaritaStatusEnum];
    }
}