export class Ownermodel {
    id: string
    firstName: string
    middleName: string
    lastName: string
    address: string
    typeId: number
    value: number
    year: number
    brandId: number
    modal: string
    vinCode: string
    license: string
    stateId: number
    experience: number
    parkingCityName: string
    parkingStateId:number
    isDeleted: boolean
    states: []
    cities: []
    carBrands: []
    dotInspectionPath: string
    currentRegistrationPath: string
    email:string
    statusId:number
    rejectedReason:string
    jwtToken:string|null
    isSubmitted:boolean
}
