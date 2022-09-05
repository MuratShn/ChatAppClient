import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetMyChatGroupDetailResponse } from 'src/app/models/GetMyChatGroupDetailResponse';
import { GetUserInfoResponse } from 'src/app/models/GetUserInfoResponse';
import { ChatGroupService } from 'src/app/services/chat-group.service';
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
    private readonly chatGroupService:ChatGroupService
    ) { }

  userDetail:GetUserInfoResponse = null as any
  chatGroup : GetMyChatGroupDetailResponse = null as any


  async ngOnInit(){
    this.spinner.show();

    this.chatGroup = await this.chatGroupService.getMyChatGroups(()=>({}),()=>({}));

    this.userDetail = await this.userService.getUserInfo(
      ()=>this.spinner.hide()
      );
    console.log(this.userDetail)
    console.log(this.chatGroup)
  }
  
}

