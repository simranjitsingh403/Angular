import { Customertrademodel } from "./customertrademodel"

export class Customercreditmodel {
    id: string = "00000000-0000-0000-0000-000000000000"
    customerId: string = "00000000-0000-0000-0000-000000000000"
    isPORequired: boolean = false
    taxExemptAttachment: string | null = null
    businessYears: number = 0
    taxID: string | null = null
    companyName: string | null = null
    shippingAddress: string | null = null
    shippingCityName: string | null = null
    shippingZip: number = 0
    billingAddress: string | null = null
    billingCityName: string | null = null
    billingZip: number  = 0
    contactNumber: string | null = null
    fax: string | null = null
    apContactName: string | null = null
    apContactNumber: string | null = null
    apContactMail: string | null = null
    invoiceEmail: string | null = null
    bankName: string | null = null
    bankContactNumber: string | null = null
    bankAddress:string | null = null
    bankCityName: string | null = null
    bankZip: number = 0
    presidentName: string | null = null
    vicePresidentName: string | null = null
    secretary: string | null = null
    signature: string | null = null
    statusId: number | null = null
    isDeleted: boolean = false
    createdBy: string = "00000000-0000-0000-0000-000000000000"
    createdDateTime: string | null = null
    trades: Customertrademodel[] = []
    shippingStateId:string | null = null
    billingStateId:string | null = null
    bankStateId:string | null = null
    states:[] = []
    cities:[] = []
    isSubmitted:boolean = false
    rejectedReason:string | null = null
}
