export class Usermodel {

    id: string = "00000000-0000-0000-0000-000000000000"
    userName: string | null = null
    firstName: string | null = null
    lastName: string | null = null
    middleName: string | null = null
    email: string | null = null
    roleId: string = "00000000-0000-0000-0000-000000000000"
    stateId: number | null = null
    phoneNumber: string | null = null
    address: string | null = null
    roles: [] = []
    states: [] = []
    profilePicture: string | null = null
    zipCode: number | null = null
    files: any
    ownerId: string = "00000000-0000-0000-0000-000000000000"
    driverId: string = "00000000-0000-0000-0000-000000000000"
    roleName:string | null = null
    password:string | null = null
    confirmPassword:string | null = null
    passwordToken:string | null = null
    customerId : string = "00000000-0000-0000-0000-000000000000"
    modifiedBy: string = "00000000-0000-0000-0000-000000000000"
    modifiedDateTime: string | null = null
}
