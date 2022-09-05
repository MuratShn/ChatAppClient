import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { DefaultMessageComponent } from './components/default-message/default-message.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"",component:HomeComponent,children:[
    {path:"",component:DefaultMessageComponent},
    {path:"chat/:id",component:ChatComponent}]
  },
  {path:"login",component:LoginComponent},
  {path:"**",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
