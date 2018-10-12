import { Component,ElementRef, ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import  firebase, { auth } from 'firebase';
import {Observable} from 'rxjs/Rx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  ILatLng
 } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfileProvider } from '../../providers/profile/profile';
 declare var google;

/**
 * Generated class for the TalentHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-talent-home',
  templateUrl: 'talent-home.html',
})
export class TalentHomePage {

  overlayHidden: boolean = true;
  @ViewChild('map') mapElement:ElementRef;
  map: GoogleMap;
  latitude :number;
  longitude :number;
  test:any;
  clientName="";
  notif:boolean=false;
  track:boolean=false;
  constructor(public navCtrl: NavController,public profileProvider:ProfileProvider, public navParams: NavParams,private _googleMaps:GoogleMaps,private _geoLoc:Geolocation) {
    
   
  }

  ngAfterViewInit(){
    Observable.interval(5000).takeWhile(()=>!this.track).subscribe(x=>{
            Observable.interval(3000).takeWhile(()=>!this.notif && !this.track).subscribe(x => {
              this.test=this.profileProvider.otherId;
                
                  if(this.profileProvider.otherId!=""){
                    this.profileProvider.usersProfile.child(this.profileProvider.otherId).once('value').then(dataSnapshot=>{
                        this.clientName=dataSnapshot.val().fname+" "+dataSnapshot.val().lname;
                    }).then(()=>{
                      this.showNotification(true);
                      this.notif=true;
                    });
                  }
                  else{
                    this.showNotification(false);
                  }
                  
                
            });
    })
    

    //this.firstCreateMapOwnLocation();

   //this.firstCreateMap();
   
  }
  
  showNotification(show:boolean){
    if(show){
      this.overlayHidden = false;
    }
    else{
      this.overlayHidden = true;
    }
    
  }
  accept(){
    firebase.database().ref('userProfile').child(this.profileProvider.otherId).update({
      otherid:this.profileProvider.id
    }).then(()=>{
                this.showNotification(false);
                this.track=true;
                this.notif=false;
                //add to history
                let d=new Date();
                let currentDate: any = d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();

                let name:any;
                let type:any;
                let total:any;
                firebase.database().ref('userProfile').child(this.profileProvider.otherId).once('value').then(dataSnapshot=>{
                  name=dataSnapshot.val().fname + " "+ dataSnapshot.val().lname;
                  type=this.profileProvider.type;
                  total=this.profileProvider.price;
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
                }); 
    }).then(()=>{
              Observable.interval(2000).takeWhile(()=>this.track).subscribe(x => {
                if(this.profileProvider.otherId!=""){
                  this.firstCreateMap();
                  firebase.database().ref(`userProfile/`).child(this.profileProvider.otherId).on('value',(dataSnapshot)=>{
                    this.updateMap();
                });
                }
                  
              });
    });
    
    
  }
  refuse(){
    firebase.database().ref('userProfile').child(this.profileProvider.id).update({
      otherid: ""
    }).then(()=>{
      this.showNotification(false);
      this.notif=false;
      this.profileProvider.refuse=true;
    });
  }

  /*getOtherLocation(){
    firebase.database().ref(`userProfile/${this.profileProvider.otherId}`);
  }*/
  firstCreateMap() {
    firebase.database().ref(`userProfile`).child(this.profileProvider.otherId).once('value').then(dataSnapshot=>{
         this.latitude=dataSnapshot.val().latitude;
         this.longitude=dataSnapshot.val().longitude;}).then(()=>{
                     let loc:LatLng;
                     this.initMap();
                     this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
                                         loc=new LatLng(this.latitude,this.longitude);
                                         this.moveCamera(loc);
                                         
                                         this.createMarker(loc,"Client").then((marker:Marker)=>{
                                           marker.showInfoWindow();
                                         }).catch(err=>{
                                           console.log(err);
                                         });  
                                 });
             });

}
firstCreateMapOwnLocation() {
          let loc:LatLng;
          this.initMap();
          this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
                this.getLocation().then(res=>{
                  console.log(res.coords.latitude);
                  console.log(res.coords.longitude);
                  loc=new LatLng(res.coords.latitude,res.coords.longitude);
                  this.moveCamera(loc);

                  this.createMarker(loc,"Me").then((marker:Marker)=>{
                    marker.showInfoWindow();
                  }).catch(err=>{
                    console.log(err);
                  });
                  
                }).catch(err=>{
                  console.log(err);
                });
                
          });

}
  updateMap(){
    firebase.database().ref(`userProfile`).child(this.profileProvider.otherId).once('value').then(dataSnapshot=>{
      this.latitude=dataSnapshot.val().latitude;
      this.longitude=dataSnapshot.val().longitude;
      }).then(()=>{ 
                                       let loc:LatLng;
                                      loc=new LatLng(this.latitude,this.longitude);
                                      this.moveCameraWZ(loc);
                                      this.map.clear();
                                      this.createMarker(loc,"Client").then((marker:Marker)=>{
                                        marker.showInfoWindow();
                                      }).catch(err=>{
                                        console.log(err);
                                      });  
                             
          });
  }
  updateMapOwnLocation() {
           let loc:LatLng;
          this.getLocation().then(res=>{
            loc=new LatLng(res.coords.latitude,res.coords.longitude);
            this.map.clear();
            this.moveCamera(loc);
            this.createMarker(loc,"Me").then((marker:Marker)=>{
              marker.showInfoWindow();
            }).catch(err=>{
              console.log(err);
            });
          }).catch(err=>{
            console.log(err);
          });
    
  }
 

  getLocation(){
    return this._geoLoc.getCurrentPosition();
  }

  createMarker(loc:LatLng,title:string){
    let markerOptions:MarkerOptions={
      position:loc,
      title:title
    }
    return this.map.addMarker(markerOptions);
  }

  moveCamera(loc:LatLng){
    let options : CameraPosition<ILatLng>={
      target:loc,
      zoom:20,
      tilt:0
    }
    this.map.moveCamera(options);
  
  }
  moveCameraWZ(loc:LatLng){
    let options : CameraPosition<ILatLng>={
      target:loc,
      tilt:0
    }
    this.map.moveCamera(options);
  
  }

  initMap() {

    let element=this.mapElement.nativeElement;
    this.map=this._googleMaps.create(element);
    
  
  }


  
 
   

}
