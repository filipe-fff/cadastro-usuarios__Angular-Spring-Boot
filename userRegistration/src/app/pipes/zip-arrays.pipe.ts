import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'zipArrays',
    standalone: true
})
export class zipArraysPipe implements PipeTransform {

    transform(array1: any[], array2: any[]): any[] {

        if (array1.length === 0 && array2.length === 0) {
            return [];
        }
        
        const maxArray = Math.max(array1.length, array2.length);

        let result: any[] = [];

        for (let i=0; i < maxArray; i++) {

            result[i] = {
                before: {},
                after: {}
            };

            const keys = new Set([
                ...Object.keys(array1[i] || {}),
                ...Object.keys(array2[i] || {})
            ]);

            keys.forEach(key => {
                result[i]["before"][key] = array1?.[i]?.[key];
                result[i]["after"][key] = array2?.[i]?.[key];
            });
        }

        return result;
    }
}