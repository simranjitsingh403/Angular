export class Drivermodel {

    id: string = "00000000-0000-0000-0000-000000000000"
    userName: string | null = null
    firstName: string | null = null
    lastName: string | null = null
    middleName: string | null = null
    email: string | null = null
    stateId: number | null = null
    phoneNumber: string | null = null
    isLegallyAllowed: boolean = false
    licenseClassId: number | null = null
    isUSAuthorized: boolean = false
    isImmigrationAllowed: boolean = false
    salaryExpectation: number | null = null
    jobType: number = 0
    referredByName: string | null = null
    joiningDate: Date | null = null
    comments: string | null = null
    genderId: number | null = null
    raceId: number | null = null
    veteranId: number | null = null
    createdBy: string | null = null
    createdDateTime: Date | null = null
    isDeleted : boolean | null = null
    formStatusId : number = 0
    rejectedReason:string | null = null
    jwtToken:string|null = null
    isSubmitted:boolean = false
    licenseClasses: [] = []
    jobTypes: [] = []
    genders: [] = []
    races: [] = []
    veteran: [] = []
    states: [] = []
    documentTypes: [] = []
    documents:any = [] 
}
