import {IUserDto, IUserLoginDTO } from "../../../dtos/user/IUserDto";
import { ISignup } from "../../../types/authTypes";

export interface IAuthService {
    login(email: string, password: string):Promise<IUserLoginDTO>
    signup(data: ISignup): Promise<void>
    verifyOtp(email: string, otp: string): Promise<void>
    resendOtp(email: string): Promise<void>
    googleAuth(googleToken: string): Promise<IUserLoginDTO>
    getUser(id:string):Promise<IUserDto>
    forgotPassword(email: string): Promise<void>
    verifyForgotOtp(email: string, otp: string): Promise<void>
    resetPassword(email: string, newPassword: string): Promise<void>
}