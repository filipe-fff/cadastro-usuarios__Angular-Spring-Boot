import { AddressListUserForm } from "../../types/address-list-user-form";
import { PhoneListUserForm } from "../../types/phone-list-user-form";

export interface IContactInformationsUserForm {
    phoneList: PhoneListUserForm;
    addressList: AddressListUserForm;
};