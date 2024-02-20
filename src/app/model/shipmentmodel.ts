export class Shipmentmodel {
    id: string
    customerId: string
    originAddress: string
    originCityName: string
    originStateId: number
    originZip: string
    destinationAddress: string
    destinationCityName: string
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
