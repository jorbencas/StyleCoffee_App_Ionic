import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';   
//import AuthService from '../services/Auth.service';
import {UserService } from '../core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private UserService: UserService){}
    user = "";
    passwd = "";
    usercredentials = {user: "", passwd : ""};
    userbool = false;
  ngOnInit(): void {
  }

  handlenomralauth(email){
   //this.AuthService.signInWithGoogle();
  }
  handleauth() {
    console.log("Username: " + this.user + "Password: " +  this.passwd );
    this.usercredentials.user = this.user;
    this.usercredentials.passwd = this.passwd;
    this.UserService.attemptAuth("login",this.usercredentials);
  }


  handleLogout() {
   
  }

}
