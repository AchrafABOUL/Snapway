import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClientHomePage } from '../client-home/client-home';

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  review:any;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController ,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }
submit(event){
  let alert=this.alertCtrl.create({
    message: "Thank you for the review",
    buttons: [
      {
        text: "Ok",
        role: 'cancel'
      }
    ]
  });
  alert.present().then(()=>{
    this.navCtrl.setRoot(ClientHomePage);
  });
}
}
