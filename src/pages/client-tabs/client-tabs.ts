import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { ClientHomePage } from '../client-home/client-home';
import { ClientHistoryPage } from '../client-history/client-history';
import { ClientSettingsPage } from '../client-settings/client-settings';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the ClientTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client-tabs',
  templateUrl: 'client-tabs.html'
})
export class ClientTabsPage {

  clientHomeRoot = ClientHomePage
  clientHistoryRoot = ClientHistoryPage
  clientSettingsRoot = ClientSettingsPage


  constructor(public navCtrl: NavController,public _geoLoc: Geolocation) {
    
  }

}
