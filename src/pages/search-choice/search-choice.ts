import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { SearchResultPage } from '../search-result/search-result';
import { SearchingPage } from '../searching/searching';
/**
 * Generated class for the SearchChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-choice',
  templateUrl: 'search-choice.html',
})
export class SearchChoicePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchChoicePage');
  }
  search(type: string){
    this.navCtrl.setRoot(SearchingPage,{type:type});
  }
  

}
