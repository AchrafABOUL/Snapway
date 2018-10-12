import { Component } from '@angular/core';
import { NavController, NavParams,App, AlertController, Loading } from 'ionic-angular';
import { TalentTabsPage } from '../talent-tabs/talent-tabs';
import  firebase, { auth } from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { Subscriber } from 'rxjs/Subscriber';
import {Observable} from 'rxjs/Rx';
import { ProfileProvider } from '../../providers/profile/profile';
import { ClientTabsPage } from '../client-tabs/client-tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:any="";
  password:any="";
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public profileProvider:ProfileProvider, public navParams: NavParams,public appCtrl: App,public authProvider:AuthProvider) {
   
    

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  login(event): void {
    
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( authData => {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          
          this.profileProvider.user = user;
          this.profileProvider.id = user.uid;
          this.profileProvider.email=user.email;
          this.profileProvider.otherId="";
          this.profileProvider.userProfile = firebase.database().ref(`userProfile/${this.profileProvider.id}`);
          this.profileProvider.userProfile.update({
            otherid:"",
          });
        
          
          this.profileProvider.userProfile.once('value').then(dataSnapshot=> {
            this.profileProvider.isPhotograph = dataSnapshot.val().isphotograph ;
            this.profileProvider.otherId=dataSnapshot.val().otherid;
            if(this.profileProvider.isPhotograph){
              this.profileProvider.type=dataSnapshot.val().type;
              this.profileProvider.price=dataSnapshot.val().price;
              
              this.appCtrl.getRootNav().setRoot(TalentTabsPage);
            }
            else{
              this.appCtrl.getRootNav().setRoot(ClientTabsPage);
            }
          });
         
        }
      });
      
    }, error => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
     
    }
  );

  }

  firebaseAuth() :  any {
      return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
    });
  }
  
  

}
