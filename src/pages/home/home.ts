import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import  firebase, { auth } from 'firebase';
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
 declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement:ElementRef;
  map: GoogleMap;
  latitude :number;
  longitude :number;
  constructor(public navCtrl: NavController,private _googleMaps:GoogleMaps,private _geoLoc:Geolocation) {
            
    
  }

  ngAfterViewInit(){
    this.firstCreateMap();
    firebase.database().ref(`userProfile/hihoo`).on('value',(dataSnapshot)=>{
      this.updateMapOwnLocation();
    });
      
    
  }
  updateMap(){
    firebase.database().ref(`userProfile/hihoo`).once('value').then(dataSnapshot=>{
      this.latitude=dataSnapshot.val().latitude;
      this.longitude=dataSnapshot.val().longitude;
      }).then(()=>{
                                       let loc:LatLng;
                                      loc=new LatLng(this.latitude,this.longitude);
                                      this.moveCamera(loc);
                                      this.map.clear();
                                      this.createMarker(loc,"Bitiel").then((marker:Marker)=>{
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
            this.createMarker(loc,"Bitiel").then((marker:Marker)=>{
              marker.showInfoWindow();
            }).catch(err=>{
              console.log(err);
            });
          }).catch(err=>{
            console.log(err);
          });
    
  }
  firstCreateMap() {
                 firebase.database().ref(`userProfile/hihoo`).once('value').then(dataSnapshot=>{
                      this.latitude=dataSnapshot.val().latitude;
                      this.longitude=dataSnapshot.val().longitude;}).then(()=>{
                                  let loc:LatLng;
                                  this.initMap();
                                  this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
                                                      loc=new LatLng(this.latitude,this.longitude);
                                                      this.moveCamera(loc);
                                                      
                                                      this.createMarker(loc,"Bitiel").then((marker:Marker)=>{
                                                        marker.showInfoWindow();
                                                      }).catch(err=>{
                                                        console.log(err);
                                                      });  
                                              });
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
    zoom:5,
    tilt:0
  }
  this.map.moveCamera(options);

}

  initMap() {

    let element=this.mapElement.nativeElement;
    this.map=this._googleMaps.create(element);
    
  
  }


}
