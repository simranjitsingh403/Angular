export class Shipmentmodel {
    id: string
    customerId: string
    originAddress: string
    originCityId: number
    originStateId: number
    originZip: string
    destinationAddress: string
    destinationCityId: number
    destinationStateId: number
    destinationZip: string
    height: number
    width: number
    length: number
    weight: number
    isHazmat: boolean
    comments: string
    comodity: string
    statusId: number
    isDeleted: boolean
    createdBy: string
    createdDateTime: string
    jwtToken:string | null
}
