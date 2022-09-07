import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetMessagesQueryResponse } from '../models/GetMessagesQueryResponse';
import { AddMessageCommandResponse } from '../models/AddMessageCommandResponse';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient:HttpClient) { }
  baseUrl:string = "https://localhost:7183/api/"

  
  async GetMessages(chatId:string,successCallBack?:()=>void,errorCallBack?:(message:string)=>void){
    let newUrl = this.baseUrl + "Message/getMessages"

    let data : Promise<GetMessagesQueryResponse> | any = this.httpClient.get(newUrl,{params:{ChatId:chatId}}).toPromise();
    
    data
    .then(  () => successCallBack!())
    .catch( ( (error:HttpErrorResponse) => errorCallBack!(error.message)))

    return await data
  }

  async addMessage(chatId:string,message:string,successCallBack?:()=>void,errorCallBack?:(message:string)=>void){
    let newUrl = this.baseUrl + "Message/addMessage"
    let data : Promise<AddMessageCommandResponse> | any = this.httpClient.post(newUrl,{ChatId:chatId,Message:message}).toPromise();
    
    data
    .then(()=>successCallBack!())
    .catch((error:HttpErrorResponse) => errorCallBack!(error.message))
    
    return await data
  }

}
