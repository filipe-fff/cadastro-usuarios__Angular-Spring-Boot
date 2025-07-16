import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/phone-to-display.interface";
import { IPhone } from "../interfaces/user/phone.interface";
import { PhoneList } from "../types/phone-list";
import { phoneTypeDescriptionMap } from "./phone-type-description-map";

export const preparePhoneToDisplayList = (toDisplay: boolean, phoneList: PhoneList, callback: (phone: IPhoneToDisplay) => void) => {
    Object.keys(phoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {

        const phoneFound = phoneList.find(p => p.type === phoneType);

        let number: string;

        if (toDisplay) { }

        number = phoneFound ? numberFormat(phoneFound) : "-";

        callback({
            type: phoneType,
            typeDescription: phoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
            number
        });
    });
};

export const numberFormat = (phone: IPhone): string => {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
};