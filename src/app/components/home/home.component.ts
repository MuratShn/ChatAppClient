import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetUserInfoResponse } from 'src/app/models/GetUserInfoResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly userService:UserService,
    private readonly spinner:NgxSpinnerService
    ) { }

  userDetail:GetUserInfoResponse = null as any

  async ngOnInit(){
    this.spinner.show();
    this.userDetail = await this.userService.getUserInfo(
      ()=>this.spinner.hide()
      );
    console.log(this.userDetail)
  }
  
}

