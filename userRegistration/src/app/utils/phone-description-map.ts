import { PhoneTypeEnum } from "../enums/phone-type.enum";

export const phoneDescriptionMap: {[key in PhoneTypeEnum]: string} = {
    [PhoneTypeEnum.RESIDENTIAL]: "Residencial",
    [PhoneTypeEnum.MOBILE]: "Celular",
    [PhoneTypeEnum.EMERGENCY]: "Emergêncial"
};