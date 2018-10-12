
import { Injectable } from '@angular/core';
import  firebase from 'firebase';
import { AuthProvider } from '../auth/auth';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Rx';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  public userProfile:firebase.database.Reference;
  public usersProfile:firebase.database.Reference;
  public currentUser:firebase.User;
  public user: any;
  public email: any;
  public id: any;
  public latitude:any;
  public longitude:any;
  public otherId:any="salam";
  public history:any={};

  public isPhotograph:any=false;
  public type:any;
  public price :any;

  public refuse:boolean=false ;
  constructor(public authProvider:AuthProvider,private _geoLoc:Geolocation) {
      this.usersProfile=firebase.database().ref(`userProfile/`);
    console.log('Hello ProfileProvider Provider');
    _geoLoc.watchPosition().subscribe(position=>{
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;
    });
   this.syncProfil();
        

        
    
  }
  syncProfil(){
      Observable.interval(3000).subscribe(x => {
        //push
        if(this.id){
            this.userProfile.update({
              latitude:this.latitude,
              longitude:this.longitude
              });
        //pull
          firebase.database().ref(`userProfile/`).child(this.id).child('otherid').on('value',(dataSnapshot)=> {
            this.otherId=dataSnapshot.val();
          });
        }
          
      });
  }


  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }
  getDbOtherId():Promise<any>{
    return this.userProfile.child('otherid').once('value');
  }
}
