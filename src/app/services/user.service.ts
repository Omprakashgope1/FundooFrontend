import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

// interface LoginResponse {
//   id?: string,
//   firstName?: string,
//   lastName?: string,
//   email?: string,
//   status?: number,
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) { }

  async login(credentials: { email: string; password: string }): Promise<any> {
    try {
      const res: any = await this.httpService.loginSignupCall("User/Login", credentials) || {}
      // localStorage.setItem("accessToken", res?.id || "")
      // localStorage.setItem("userName", `${res?.firstName} ${res?.lastName}` || "" )
      // localStorage.setItem("userEmail", res?.email || "")
      return res
    } catch (error) {
      return error || {}
    }
  }

  async signup(data: {}): Promise<any> {
    try {
      console.log(JSON.stringify(data));
      return this.httpService.loginSignupCall("User/Register", data)
    } catch (error) {
      return error
    }
  }
}
