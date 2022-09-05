import { GetMessagesDto } from "../DTO'S/GetMessagesDto"

export interface GetMessagesQueryResponse{
    myUserName : string
    messages : GetMessagesDto[]
 }
