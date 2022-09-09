import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HubConnectionState } from '@microsoft/signalr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddMessageCommandResponse } from 'src/app/models/AddMessageCommandResponse';
import { GetMyChatGroupDetailResponse } from 'src/app/models/GetMyChatGroupDetailResponse';
import { GetUserInfoResponse } from 'src/app/models/GetUserInfoResponse';
import { ChatGroupService } from 'src/app/services/chat-group.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly userService:UserService,
    private readonly spinner:NgxSpinnerService,
    private readonly chatGroupService:ChatGroupService,
    private readonly fb:FormBuilder,
    private readonly signalRService:SignalRService
    ) { }

  addGroupForm:FormGroup = null as any

  userDetail:GetUserInfoResponse = null as any
  chatGroup : GetMyChatGroupDetailResponse = null as any


  async ngOnInit(){
    console.log("test init")
    this.createGroupForm();
    this.spinner.show();
   
    await this.signalRService.start()
    
    this.userDetail = await this.userService.getUserInfo(
      ()=>{
       
      });

    const _connection = this.signalRService.connection;
    _connection.invoke("login",this.userDetail.userName) //login oldugunda servera haber ettik

    this.chatGroup = await this.chatGroupService.getMyChatGroups(
      ()=>{ 
      this.spinner.hide();}
      ,()=>({}));

    console.log(this.userDetail)
    console.log(this.chatGroup)
   
  }

  createGroupForm(){
    this.addGroupForm = this.fb.group({
      groupName:["",Validators.required],
      groupUsers:["",Validators.required],
      groupPhoto:[""],
      groupDescription:[""]
    })

  }
  async addGroup(){
    console.log(this.addGroupForm.value)
    if(this.addGroupForm.valid){
      if(this.addGroupForm.get("groupUsers")?.value.split(",").length >= 2)
      {
        // this.addGroupForm.setValue({"groupUsers":users})
        let groupAddModel = this.addGroupForm.value;
        console.log(groupAddModel)
        let result = await this.chatGroupService.addGroup(groupAddModel);
        if(!result.isSucceded)
        { 
          console.log(result.message)
        }
      }
      else{
        console.log("User sıkıntısı")
      }

    }
  }
}

