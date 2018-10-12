import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginHomePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-home',
  templateUrl: 'login-home.html'
})
export class LoginHomePage {

  loginRoot = LoginPage;
  registerRoot = RegisterPage;

  

  constructor(public navCtrl: NavController) {}

  


}


