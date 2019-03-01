import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';   
//import AuthService from '../services/Auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /*constructor(
    private AuthService: AuthService){}*/
    user = {};
    userbool = false;
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(userfirebase => {
      this.user = userfirebase;
    });
    console.log(this.user);
  }

  handlenomralauth(email){
   //this.AuthService.signInWithGoogle();
  }
  handleauth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))

  }


  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log(`this.user.email ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

}
