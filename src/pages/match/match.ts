import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import { ReviewPage } from '../review/review';
/**
 * Generated class for the MatchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {
    public l:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  ionViewDidLeave(){
    //this.l=false;
}
  ionViewDidLoad() {
    //this.l=true;
    let i:number=0;
    Observable.interval(1000).takeWhile(() => this.l).subscribe(x => {
      i=i+1;
      if(i==3){
        this.navCtrl.setRoot(ReviewPage);
        this.l=false;
      }
    });
    
  }

}
