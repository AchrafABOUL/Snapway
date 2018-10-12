import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import  firebase, { auth } from 'firebase';
import { ProfileProvider } from '../../providers/profile/profile';
/**
 * Generated class for the ClientSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client-settings',
  templateUrl: 'client-settings.html',
})
export class ClientSettingsPage {
  fName:any="";
  lName:any="";
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public profileProvider:ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientSettingsPage');
  }
  update(){
    if(this.fName!="" && this.lName!=""){
      firebase.database().ref('/userProfile').child(this.profileProvider.id).update({
        fname: this.fName,
        lname:this.lName
        }).then(()=>{
          this.fName="";
          this.lName="";
        });
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
        subTitle: 'All infos are required ! ',
        buttons: ['OK']
      });
      alert.present();
    }
    
  
}


}
