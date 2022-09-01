import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginResponse } from 'src/app/models/UserLoginResponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( 
    private formBuilder:FormBuilder,
    private readonly userService:UserService
    ) { }

  registerForm! : FormGroup;
  loginForm!:FormGroup

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail:["",Validators.required],
      password:["",Validators.required]
    })

    this.registerForm = this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(2)]],
      surname:["",[Validators.required,Validators.minLength(2)]],
      username:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.min(3)]],
      passwordConfirm:["",[Validators.required,Validators.min(3)]]
    })
  }
  


  Change(){
    if(document.getElementById("login")!.style.display == ""){
      document.getElementById("login")!.style.display = "none"
      document.getElementById("register")!.style.display = ""
      console.log("test")
    }

    else if(document.getElementById("register")!.style.display == ""){
      console.log("test")
      document.getElementById("login")!.style.display = ""
      document.getElementById("register")!.style.display = "none"
    }
    
   
  }

  register(){
    console.log(this.registerForm.value)
    if(this.registerForm.valid && this.registerForm.get("password")?.value == this.registerForm.get("passwordConfirm")?.value){
      let registerForm = Object.assign({},this.registerForm.value)
      this.userService.createUser(registerForm,
        ()=>{console.log("Başarılı")},errorMessage=>{console.log(errorMessage)})
    }
  }

  async login(){
    if(this.loginForm.valid){
  
      let loginForm = Object.assign({},this.loginForm.value)
      console.log(loginForm)
      let result:UserLoginResponse = await this.userService.login(loginForm,
        ()=>{},
        errorMessage=>{console.log(errorMessage)})

        console.log(result)

        if(result.message == null){
          localStorage.setItem("_T",result.accessToken.token)
        }
        else{
          console.log(result.message)
        }

    }
  }
}
