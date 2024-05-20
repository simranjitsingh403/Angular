import { Customercreditmodel } from "./customercreditmodel"
import { Shipmentmodel } from "./shipmentmodel"

export class Customermodel {
    id: string = "00000000-0000-0000-0000-000000000000"
    firstName: string | null = null
    middleName: string | null = null
    lastName: string | null = null
    email: string | null = null
    accountNumber: number = 0
    userId: string = "00000000-0000-0000-0000-000000000000"
    isDeleted: boolean = false
    createdBy: string = "00000000-0000-0000-0000-000000000000"
    createdDateTime: string | null = null
    shipment: Shipmentmodel = new Shipmentmodel()
    customerCredit: Customercreditmodel = new Customercreditmodel()
    cities:[] = []
    states:[] = []
    modifiedBy: string = "00000000-0000-0000-0000-000000000000"
    modifiedDateTime: string | null = null
}
