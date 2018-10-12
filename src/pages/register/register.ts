import { Component } from '@angular/core';
import {  NavController, NavParams,Tabs, AlertController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import  firebase, { auth } from 'firebase';
import { TalentTabsPage } from '../talent-tabs/talent-tabs';
import { ClientTabsPage } from '../client-tabs/client-tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  fName:any;
  lName:any;

  email:any;
  password:any;
  cPassword:any;

  type:any;
  price:number;

  isPhotograph:any=false;
  public userProfileRef:firebase.database.Reference;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public tabs:Tabs, public profileProvider:ProfileProvider, public navParams: NavParams,public appCtrl: App,public authProvider:AuthProvider) {
   
    this.userProfileRef = firebase.database().ref('/userProfile');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(event): void {
        if(this.password==this.cPassword){
                  firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then( newUser => {
                    this.userProfileRef.child(newUser.uid).child('history').set({1:1});
                    this.userProfileRef.child(newUser.uid).update({
                      email: this.email,
                      fname: this.fName,
                      lname:this.lName,
                      isphotograph:this.isPhotograph,
                      otherid:"",
                      latitude: "",
                      longitude:""
                    });
                    if(this.isPhotograph){
                      this.userProfileRef.child(newUser.uid).update({
                        type: this.type,
                        price:this.price,
                      });
                    }
                    //debut login
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( authData => {
                      firebase.auth().onAuthStateChanged( user => {
                        if (user) {
                          
                          this.profileProvider.user = user;
                          this.profileProvider.id = user.uid;
                          this.profileProvider.email=user.email;
                          this.profileProvider.userProfile = firebase.database().ref(`userProfile/${this.profileProvider.id}`);

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
                //fin login
          
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
       
  }
  goLogin(event){
    this.tabs.select(0);
  }

}
