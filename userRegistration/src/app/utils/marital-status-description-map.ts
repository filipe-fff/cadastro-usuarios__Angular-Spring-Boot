import { MaritaStatusEnum } from "../enums/marital-status.enum"

export const maritalStatusDescriptionMap: {[key in MaritaStatusEnum]: string} = {
    [MaritaStatusEnum.SINGLE]: "Solteiro",
    [MaritaStatusEnum.MARRIED]: "Casado",
    [MaritaStatusEnum.DIVORCED]: "Divorciado"
};