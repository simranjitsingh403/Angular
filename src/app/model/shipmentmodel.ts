export class Shipmentmodel {
    id: string = "00000000-0000-0000-0000-000000000000"
    customerId: string | null = null
    originAddress: string | null = null
    originCityName: string | null = null
    originStateId: number | null = null
    originZip: number | null = null
    destinationAddress: string | null = null
    destinationCityName: string | null = null
    destinationStateId: number | null = null
    destinationZip: number | null = null
    height: number | null = null
    width: number | null = null
    length: number | null = null
    weight: number | null = null
    isHazmat: boolean = false
    comments: string | null = null
    comodity: string | null = null
    statusId: number | null = null
    isDeleted: boolean = false
    createdBy: string | null = null
    createdDateTime: string | null = null
    jwtToken:string | null = null
    states:[] = []
    dimensionsUnit: string | null = null
}
