import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateUserResponse } from '../models/CreateUserResponse';

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
    let data = this.httpClient.post(newPath,form).toPromise();
    
    data.then(d=>successCallBack!())
    .catch((error:HttpErrorResponse) => errorCallBack!(error.message))

    return await data
  }
}
