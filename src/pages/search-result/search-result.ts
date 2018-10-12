import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import  firebase, { auth } from 'firebase';
import { MatchingPage } from '../matching/matching';
/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  results:any=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider:ProfileProvider) {
    this.results = navParams.get("results");
    console.log(this.results);
    
   
    
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }

  snap(key:any){
    this.profileProvider.usersProfile.child(key).update({
        otherid : this.profileProvider.id
    });
    this.navCtrl.push(MatchingPage,{"key":key});

  }

 
    
    

  
  isMatched():any{
    //we will use profileProvider later
    let rslt:boolean;
    firebase.database().ref('/userProfile')
   .child('TpCel6ckOzO83pIzOlCpU4QRaII2')
   .once('value')
   .then((dataSnapshot)=>{
     console.log(dataSnapshot.val().otherid);
     rslt=(dataSnapshot.val().otherid=="");
     console.log(rslt);
     return rslt
   });

  }
  

  

}
