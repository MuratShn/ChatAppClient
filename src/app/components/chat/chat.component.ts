import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMessagesDto } from 'src/app/DTO\'S/GetMessagesDto';
import { AddMessageCommandResponse } from 'src/app/models/AddMessageCommandResponse';
import { GetChatDetailQueryResponse } from 'src/app/models/GetChatDetailQueryResponse';
import { GetMessagesQueryResponse } from 'src/app/models/GetMessagesQueryResponse';
import { ChatGroupService } from 'src/app/services/chat-group.service';
import { MessageService } from 'src/app/services/message.service';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatId:string|null="";
  ChatGroupDetail:GetChatDetailQueryResponse = null as any
  Messages : GetMessagesQueryResponse = null as any
  MyUserName : string = ""
  PageNo:number = 0;
  LastHeight:number = 0

  constructor(
    private readonly route:ActivatedRoute,
    private readonly chatGroupService:ChatGroupService,
    private readonly messageService:MessageService,
    private readonly signalRService:SignalRService,
    ) {}

  
    
  async ngOnInit() {

    console.log("test init")

    await this.signalRService.start();
    const _connection = this.signalRService.connection;

    _connection.on("receiveMessage",(message:GetMessagesDto)=>{
      this.Messages.messages.push(message)
    })

    this.route.params.subscribe(async x=>{
      this.chatId = x["id"]
      await this.getGroupDetail(this.chatId!)
      await this.getMessages(this.chatId!);
      this.delay(100).then(()=>{this.scrollBottom()});
    }) 

    
  }

  async getGroupDetail(id:string){
    this.ChatGroupDetail = await this.chatGroupService.getGroupDetail(id,()=>{},()=>{});
    console.log(this.ChatGroupDetail)
  }

  async getMessages(id:string){
    this.Messages = await this.messageService.GetMessages(id,this.PageNo,()=>{},()=>{})
    
    this.Messages.messages.forEach((x:GetMessagesDto) => {
      x.messageTime =  new Date(x.messageTime).toLocaleString("tr-TR")
    });

    this.Messages.messages.reverse()
    this.MyUserName = this.Messages.myUserName;
  }
  
  async sendMessage(){
    let message = document.querySelector("#message") as HTMLInputElement
    
    if(message.value.length > 0){
      console.log(this.chatId,message.value)
      let result : AddMessageCommandResponse = await this.messageService.addMessage(this.chatId!,message.value,()=>{
        this.scrollBottom();
      },()=>{})
      
      if(!result.isSucceded){
        console.log(result.message)
      }

     
      // _connection.invoke("SendMessage",(message.value,this.chatId));

      // _connection.on("receiveMessage",(messageContent,date)=>{
      //   console.log(messageContent,date);
      // });

      message.value = ""
      console.log("mesaj yolandi")

    }

  }

  async onScroll($event:any){
    const s = document.querySelector("#scroll")
    if(s!.scrollTop <= 1 && this.LastHeight != s?.scrollHeight){

      this.LastHeight = s?.scrollHeight!;

      this.PageNo += 1
      let message= await this.messageService.GetMessages(this.chatId!,this.PageNo,()=>{},()=>{})

      message.messages.forEach((x:any) => {
        this.Messages.messages.unshift(x)  
      });

      s!.scrollTop = 20;
    }
  }

  scrollBottom(){
    const s = document.querySelector("#scroll")
    s!.scrollTop! = s!.scrollHeight 
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}

