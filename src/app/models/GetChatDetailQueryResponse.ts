import { UsersGroupDetailDto } from "../DTO'S/UsersGroupDetailDto"

export interface GetChatDetailQueryResponse{
    chatType:string //bunu database tarafındada yapmak lazım aslında
    chatName:string
    createdUser:string
    chatDescription:string
    chatPhoto:string
    usersDetail:UsersGroupDetailDto[]
}