import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { TalentSettingsPage } from '../talent-settings/talent-settings';
import { TalentHistoryPage } from '../talent-history/talent-history';
import { TalentHomePage } from '../talent-home/talent-home';

/**
 * Generated class for the TalentTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-talent-tabs',
  templateUrl: 'talent-tabs.html'
})
export class TalentTabsPage {

  talentHomeRoot = TalentHomePage
  talentHistoryRoot = TalentHistoryPage
  talentSettingsRoot = TalentSettingsPage


  constructor(public navCtrl: NavController) {}

}
