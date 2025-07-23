import { MaritaStatusEnum } from "../enums/marital-status.enum"
import { MaritalStatusObjList } from "../types/marital-status-obj-list";

export const maritalStatusDescriptionMap: {[key in MaritaStatusEnum]: string} = {
    [MaritaStatusEnum.SINGLE]: "Solteiro",
    [MaritaStatusEnum.MARRIED]: "Casado",
    [MaritaStatusEnum.DIVORCED]: "Divorciado"
};

export const maritalStatusObjArray: MaritalStatusObjList = Object
    .keys(maritalStatusDescriptionMap)
    .map(Number)
    .map(maritalStatusType => ({
        type: maritalStatusType,
        description: maritalStatusDescriptionMap[maritalStatusType as MaritaStatusEnum]
    }));