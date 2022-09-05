import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMessagesDto } from 'src/app/DTO\'S/GetMessagesDto';
import { GetChatDetailQueryResponse } from 'src/app/models/GetChatDetailQueryResponse';
import { GetMessagesQueryResponse } from 'src/app/models/GetMessagesQueryResponse';
import { GetMyChatGroupDetailResponse } from 'src/app/models/GetMyChatGroupDetailResponse';
import { ChatGroupService } from 'src/app/services/chat-group.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  id:string|null="";
  ChatGroupDetail:GetChatDetailQueryResponse = null as any
  Messages : GetMessagesQueryResponse = null as any

  constructor(
    private readonly route:ActivatedRoute,
    private readonly chatGroupService:ChatGroupService,
    private readonly messageService:MessageService
    ) {}

  async ngOnInit() {
    this.route.params.subscribe(x=>{
      this.id = x["id"]
      this.getGroupDetail(this.id!)
      this.getMessages(this.id!);
    }) 
    console.log("test")
  }

  async getGroupDetail(id:string){
    this.ChatGroupDetail = await this.chatGroupService.getGroupDetail(id,()=>{},()=>{});
    console.log(this.ChatGroupDetail)
  }

  async getMessages(id:string){
    this.Messages = await this.messageService.GetMessages(id,()=>{},()=>{})
    
    console.log(this.Messages.messages)
    
    this.Messages.messages.forEach((x:GetMessagesDto) => {
      x.messageTime =  new Date(x.messageTime).toLocaleString("tr-TR")
    });

    this.Messages.messages.sort(x=>x.messageTime)
    
  }

}
