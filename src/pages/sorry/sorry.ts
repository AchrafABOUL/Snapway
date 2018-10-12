import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { ClientHomePage } from '../client-home/client-home';
/**
 * Generated class for the SorryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sorry',
  templateUrl: 'sorry.html',
})
export class SorryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let i:number=0;
    Observable.interval(1000).subscribe(x => {
      i=i+1;
      if(i==4){
        navCtrl.setRoot(ClientHomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SorryPage');
  }

}
