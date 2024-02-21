import { number } from "ngx-custom-validators/src/app/number/validator"
import { Customertrademodel } from "./customertrademodel"

export class Customercreditmodel {
    id: string
    customerId: string
    isPORequired: boolean
    taxExemptAttachment: string
    businessYears: number
    taxID: string
    companyName: string
    shippingAddress: string
    shippingCityName: string
    shippingZip: string
    billingAddress: string
    billingCityName: string
    billingZip: string
    contactNumber: string
    fax: string
    apContactName: string
    apContactNumber: string
    apContactMail: string
    invoiceEmail: string
    bankName: string
    bankContactNumber: string
    bankAddress:string
    bankCityName: string
    bankZip: string
    presidentName: string
    vicePresidentName: string
    secretary: string
    signature: string
    statusId: number
    isDeleted: boolean
    createdBy: string
    createdDateTime: string
    trades: Customertrademodel[]
    shippingStateId:string
    billingStateId:string
    bankStateId:string
    states:[]
    cities:[]
}
