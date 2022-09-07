import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private _connection:HubConnection= null as any;
  
  start(){
    if(!this._connection || this._connection?.state == HubConnectionState.Disconnected){
      const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7183/hubs",{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets}
        )
      .withAutomaticReconnect()
      .build();
      hubConnection.start()
      .then(()=>{
        console.log("Bağlantı gerçekleştirildi")
      })
      .catch(()=>{setTimeout(()=>hubConnection.start(),5000)});
      this._connection = hubConnection;

    }

    this._connection.onreconnected((connectionId)=>{
      console.log("tekrar bağlandı ",connectionId)
    });

  }
}
