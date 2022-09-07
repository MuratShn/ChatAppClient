import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-default-message',
  templateUrl: './default-message.component.html',
  styleUrls: ['./default-message.component.css']
})
export class DefaultMessageComponent implements OnInit {

  constructor(private readonly signalRService:SignalRService) { }

  ngOnInit(): void {
    this.signalRService.start();
  }

}
