import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetMyChatGroupDetailResponse } from '../models/GetMyChatGroupDetailResponse';
import { GetChatDetailQueryResponse } from '../models/GetChatDetailQueryResponse';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {

  constructor(private httpClient:HttpClient) { }

  baseUrl:string = "https://localhost:7183/api/"

  async getMyChatGroups(successCallBack?:()=>void,errorCallBack?:(message:string)=>void){
    let newPath = this.baseUrl + "Chat/getMyChats" 

    let data : Promise<GetMyChatGroupDetailResponse[]> | any = this.httpClient.get(newPath).toPromise();

    data
    .then((x:any) => successCallBack!())
    .catch((error:HttpErrorResponse) => errorCallBack!(error.message))

    return await data
  }
  async getGroupDetail(id:string,successCallBack?:()=>void,errorCallBack?:(message:string)=>void){
    let newPath = this.baseUrl + "Chat/getChatDetail"

    let data : Promise<GetChatDetailQueryResponse> | any = this.httpClient.get(newPath,{params:{Id:id}}).toPromise();

    data
    .then((x:any) => successCallBack!())
    .catch((error:HttpErrorResponse) => errorCallBack!(error.message))

    return await data
  }

}
