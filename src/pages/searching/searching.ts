import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SearchResultPage } from '../search-result/search-result';
import  firebase, { auth } from 'firebase';
import {Observable} from 'rxjs/Rx';
import { HomePage } from '../home/home';
import { SearchChoicePage } from '../search-choice/search-choice';

/**
 * Generated class for the SearchingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searching',
  templateUrl: 'searching.html',
})
export class SearchingPage {
  public results :any=[];
  public result:any;
  public alive:boolean=true;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public navParams: NavParams) {
    this.search(navParams.get("type"));
    
    
  }
  ionViewWillLeave(){
      this.alive=false;
  }
  ionViewDidLoad() {
        this.alive=true;
         let i:number=0;
        Observable.interval(1000).takeWhile(() => this.alive).subscribe(x => {
          i=i+1;
          if(i==4){
            let alert=this.alertCtrl.create({
              message: "No photograph found, Try again",
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present().then(()=>{
              this.navCtrl.setRoot(SearchChoicePage);
            });
          
          }
        });
  }
  
  search(type: string){
  
    firebase.database().ref('userProfile')
    .orderByChild("isphotograph")
    .equalTo(true)
    .on("child_added", (snapshot)=> {
      
      if(snapshot.val().type==type){
        
        this.result={"key":snapshot.key,"value":snapshot.val()};
        this.results.push(this.result);
      }
     });

     if(this.results.length>0){
      this.navCtrl.setRoot(SearchResultPage,{results:this.results});
     }
     
     
     

        }

}
