import { Shipmentmodel } from "./shipmentmodel"

export class Customermodel {
    id: string
    firstName: string
    middleName: string
    lastName: string
    email: string
    accountNumber: string
    userId: string
    isDeleted: boolean
    createdBy: string
    createdDateTime: string
    shipment: Shipmentmodel = new Shipmentmodel()
    cities:[] 
    states:[]
    comodities:[]
}
