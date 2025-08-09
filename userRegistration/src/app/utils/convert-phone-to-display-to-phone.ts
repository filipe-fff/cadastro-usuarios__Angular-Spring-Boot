import { IPhoneToDisplay } from "../interfaces/phone-to-display.interface";
import { IPhone } from "../interfaces/user/phone.interface";

export const convertPhoneToDisplayToPhone = (phoneToDisplay: IPhoneToDisplay): IPhone => {

    return ({
        id: phoneToDisplay.id,
        type: phoneToDisplay.type,
        internationalCode: "+" + phoneToDisplay.number.substring(0, 2),
        areaCode: phoneToDisplay.number.substring(2, 4),
        number: phoneToDisplay.number.slice(4, -4) + "-" + phoneToDisplay.number.slice(-4)
    });
};