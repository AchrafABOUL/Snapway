import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import  firebase, { auth } from 'firebase';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the ClientHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client-history',
  templateUrl: 'client-history.html',
})
export class ClientHistoryPage {
  works : any=[];
  work:{title:any,description:any};
   shownGroup:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider:ProfileProvider) {
          profileProvider.userProfile.child('history').on('value',(dataSnapshot)=>{
            this.works=[];
            for (var e in dataSnapshot.val()) {
              if(e!="1"){
              this.work={title:e,description:dataSnapshot.val()[e]};
              this.works.push(this.work);
              }    
            }
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientHistoryPage');
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup == group;
};
}
