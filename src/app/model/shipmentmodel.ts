export class Shipmentmodel {
    id: string
    customerId: string
    originAddress: string
    originCityName: string
    originStateId: number
    originZip: number
    destinationAddress: string
    destinationCityName: string
    destinationStateId: number
    destinationZip: number
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
    states:[]
}
