import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  firebase, { auth } from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginHomePage } from '../pages/login-home/login-home';
import { TalentTabsPage } from '../pages/talent-tabs/talent-tabs';
import { ClientTabsPage } from '../pages/client-tabs/client-tabs';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MatchingPage } from '../pages/matching/matching';
import { SearchChoicePage } from '../pages/search-choice/search-choice';
import { ReviewPage } from '../pages/review/review';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginHomePage;
  public config:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authProvider:AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.firebaseConfig();
  }
  firebaseConfig(){
    this.config = {
      apiKey: "AIzaSyAgAKtDDx0aRnRRyMU5jYMfB3a6cbKf__k",
    authDomain: "snapway-313d4.firebaseapp.com",
    databaseURL: "https://snapway-313d4.firebaseio.com",
    projectId: "snapway-313d4",
    storageBucket: "snapway-313d4.appspot.com",
    messagingSenderId: "398581508888"

    };
    firebase.initializeApp(this.config);
  }

}
