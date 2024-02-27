import { Customercreditmodel } from "./customercreditmodel"
import { Shipmentmodel } from "./shipmentmodel"

export class Customermodel {
    id: string
    firstName: string
    middleName: string
    lastName: string
    email: string
    accountNumber: string
    userId: string
    isDeleted: boolean = false
    createdBy: string
    createdDateTime: string
    shipment: Shipmentmodel = new Shipmentmodel()
    customerCredit: Customercreditmodel = new Customercreditmodel()
    cities:[] 
    states:[]
}
