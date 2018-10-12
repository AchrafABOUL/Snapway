import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';
import  firebase, { auth } from 'firebase';
import { SearchChoicePage } from '../search-choice/search-choice';
import { ProfileProvider } from '../../providers/profile/profile';
/**
 * Generated class for the ClientHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client-home',
  templateUrl: 'client-home.html',
})
export class ClientHomePage {

  
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider :ProfileProvider) {
    
  }

  ionViewDidLoad() {
    
  }
  findNearest(){
    this.profileProvider.refuse=false;
    this.navCtrl.push(SearchChoicePage);
  }


}
