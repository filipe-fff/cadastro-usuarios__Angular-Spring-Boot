import { AddressTypeEnum } from "../enums/address-type.enum";
import { IAddressToDisplay } from "../interfaces/address-to-display.interface";
import { IAddress } from "../interfaces/user/address.interface";
import { AddressList } from "../types/address-list";
import { addressTypeDescriptionMap } from "./address-type-description-map";

export const prepareAddressListToDisplay = (toDisplay: boolean, addressList: AddressList, callback: (address: IAddressToDisplay) => void) => {
    Object.keys(addressTypeDescriptionMap).map(Number).forEach((addressType: number) => {

        if (!addressList) return;

        const addressFound = addressList.find(a => a.type === addressType);

        let address: IAddressToDisplay;

        if (toDisplay) {}

        address = addressFormat(addressFound, addressType);

        callback({
            ...address
        });
    })
};

export const addressFormat = (address: IAddress | undefined, addressType: number): IAddressToDisplay => {
    
    if (!address) {
        return ({
            street: "-",
            complement: "-",
            country: "-",
            state: "-",
            city: "-",
            type: addressType,
            typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum]
        });
    }

    return({
        ...address,
        type: addressType,
        typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum]
    });
};

export const addressFormatEdit = (address: IAddress | undefined, addressTye: number): IAddressToDisplay => {
    
    if (!address) {
        return ({
            type: addressTye,
            typeDescription: addressTypeDescriptionMap[addressTye as AddressTypeEnum],
            street: "",
            complement: "",
            country: "",
            state: "",
            city: ""
        });
    }

    return ({
        type: addressTye,
        typeDescription: addressTypeDescriptionMap[addressTye as AddressTypeEnum],
        street: address.street,
        complement: address.complement,
        country: address.country,
        state: address.state,
        city: address.city
    });
};