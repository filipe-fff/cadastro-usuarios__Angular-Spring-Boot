import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { PhoneToDisplay } from "../interfaces/phone-to-display.interface";
import { IPhone } from "../interfaces/user/phone.interface";
import { PhoneList } from "../types/phone-list";
import { phoneDescriptionMap } from "./phone-description-map";

export const preparePhoneToDisplayList = (toDisplay: boolean, phoneList: PhoneList, callback: (phone: PhoneToDisplay) => void) => {
    Object.keys(phoneDescriptionMap).map(Number).forEach((phoneType: number) => {

        let number: string;

        if (toDisplay) { }

        const phoneFound = phoneList.find(p => p.type === phoneType);
        number = phoneFound ? numberFormat(phoneFound) : "-";

        callback({
            type: phoneType,
            typeDescription: phoneDescriptionMap[phoneType as PhoneTypeEnum],
            number
        });
    });
};

export const numberFormat = (phone: IPhone): string => {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
};