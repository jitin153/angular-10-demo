export interface UserDetail {
    userId: number;
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    dateOfBirth: Date;
    dateOfJoining: Date;
    status: string;
    isBlocked: boolean;
    roles: string[];
}
