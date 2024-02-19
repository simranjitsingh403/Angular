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
    shippingCityId: number
    shippingZip: string
    billingAddress: string
    billingCityId: number
    billingZip: string
    contactNumber: string
    fax: string
    apcontactName: string
    apcontactNumber: string
    apcontactMail: string
    invoiceEmail: string
    bankName: string
    bankContactNumber: string
    bankAddress:string
    bankCityId: number
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