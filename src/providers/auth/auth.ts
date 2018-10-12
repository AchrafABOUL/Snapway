
import { Injectable } from '@angular/core';
import  firebase from 'firebase';
import { Platform, App } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

 
  
  
  constructor() {
  }


  login(email: string, password: string): Promise<any> {
    return  firebase.auth().signInWithEmailAndPassword(email, password);
  }
  

 

 
}
