export class Drivermodel {

    id: string
    userName: string
    firstName: string
    lastName: string
    middleName: string
    email: string
    stateId: number
    phoneNumber: string
    isLegallyAllowed: boolean
    licenseClassId: number
    isUSAuthorized: boolean
    isImmigrationAllowed: boolean
    salaryExpectation: number
    jobType: number
    referredByName: string
    joiningDate: Date
    comments: string
    genderId: number
    raceId: number
    veteranId: number
    createdBy: string
    createdDateTime: Date
    isDeleted : boolean
    formStatusId : number
    rejectedReason:string
    jwtToken:string|null
    isSubmitted:boolean
    licenseClasses: [any]
    jobTypes: [any]
    genders: [any]
    races: [any]
    veteran: [any]
    states: [any]
    documentTypes: [any]
    documents:any = []
}
