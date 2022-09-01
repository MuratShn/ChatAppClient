import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateUserResponse } from '../models/CreateUserResponse';
import { UserLoginResponse } from '../models/UserLoginResponse';
import { GetUserInfoResponse } from '../models/GetUserInfoResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  baseUrl:string = "https://localhost:7183/api/"

  async createUser(form:any,successCallBack?:()=>void,errorCallBack?:(message:string)=>void){
    let newPath = this.baseUrl + "Users/addUser"

    let data = this.httpClient.post<CreateUserResponse>(newPath,form).toPromise()
    
    data.then(d=>successCallBack!())
    .catch((error:HttpErrorResponse) => errorCallBack!(error.message))

    return await data
  }
  async login(form:any,successCallBack?:()=>void,errorCallBack?:(message:string)=>void){
    let newPath =  this.baseUrl + "Identity/login"
    let data:Promise<UserLoginResponse> | any = this.httpClient.post<UserLoginResponse>(newPath,form).toPromise();
    
    data.then((d:any)=>successCallBack!())
    .catch((error:HttpErrorResponse) => errorCallBack!(error.message))

    return await data
  }

  async getUserInfo(successCallBack?:()=>void,errorCallBack?:(message:string)=>void){
    let newPath =  this.baseUrl + "Users/getUserInfo"
    let data : Promise<GetUserInfoResponse> | any = this.httpClient.get(newPath).toPromise();
    
    data
    .then((x:any) => successCallBack!())
    .catch((error:HttpErrorResponse) => errorCallBack!(error.message))

    return await  data
  }
}
