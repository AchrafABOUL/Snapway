import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import  firebase, { auth } from 'firebase';
import { ProfileProvider } from '../../providers/profile/profile';
/**
 * Generated class for the TalentSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-talent-settings',
  templateUrl: 'talent-settings.html',
})
export class TalentSettingsPage {
  fName:any="";
  lName:any="";

  password:any;
  cPassword:any;

  type:any="";
  price:number=0;

  isPhotograph:any=false;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public profileProvider:ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TalentSettingsPage');
  }
  update(){
    if(this.fName!="" && this.lName!="" && this.type!="" && this.price.toString()!=""){
      firebase.database().ref('/userProfile').child(this.profileProvider.id).update({
        fname: this.fName,
        lname:this.lName,
        type: this.type,
        price:this.price
        }).then(()=>{
              this.fName="";
              this.lName="";
              this.type="";
              this.price=0;
        });;
        let alert = this.alertCtrl.create({
          title: 'Update Success',
          subTitle: 'Your profile was successfully updated',
          buttons: ['OK']
        });
        alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Update Failed',
        subTitle: 'All infos are required !',
        buttons: ['OK']
      });
      alert.present();
    }
      
    
  }

}
