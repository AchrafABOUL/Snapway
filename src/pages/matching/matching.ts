import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { MatchPage } from '../match/match';
import {Observable} from 'rxjs/Rx';
import  firebase, { auth } from 'firebase';
import { SorryPage } from '../sorry/sorry';

/**
 * Generated class for the MatchingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html',
})
export class MatchingPage {
  public alive:boolean=true;
  public notFound:boolean=true;
  public key:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public profileProvider:ProfileProvider) {
   
   this.key=navParams.get("key");
  }
  ionViewWillLeave(){
    this.alive=false;
  }
  ionViewDidLoad() {
    this.getResponse();
    this.alive=true;
    let i:number=0;
    Observable.interval(2000).takeWhile(() => this.alive  ).subscribe(x => {
      i=i+1;
      if(i==10 || this.profileProvider.refuse){
        this.profileProvider.usersProfile.child(this.key).update({
          otherid : ""
      }).then(()=>{
        this.profileProvider.refuse=false;
        this.navCtrl.setRoot(SorryPage);
        this.alive=false;
      });
       
      }
    });
  }
  getResponse(){
            this.notFound=true;
            Observable.interval(3000).takeWhile(() => this.notFound).subscribe(x => {
              if(this.profileProvider.id){
                  if(this.profileProvider.otherId!=""){
                      //add to history
                      let d=new Date();
                      let currentDate: any = d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();

                      let name:any;
                      let type:any;
                      let total:any;
                      firebase.database().ref('userProfile').child(this.profileProvider.otherId).once('value').then(dataSnapshot=>{
                        name=dataSnapshot.val().fname + " "+ dataSnapshot.val().lname;
                        type=dataSnapshot.val().type;
                        total=dataSnapshot.val().price;
                      }).then(()=>{
                                firebase.database().ref('userProfile')
                                .child(this.profileProvider.id)
                                .child('history')
                                .child(currentDate)
                                .set({
                                  name:name,
                                  type:type,
                                  total:total
                                 });
                      }).then(()=>{

                              //push to matchpage
                              this.notFound=false;
                              this.navCtrl.setRoot(MatchPage);

                      });
                    

                    
                    
                  }
              }
              
        });
    
  }

}
