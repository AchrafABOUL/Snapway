import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GoogleMaps } from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginHomePage } from '../pages/login-home/login-home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TalentHistoryPage } from '../pages/talent-history/talent-history';
import { TalentHomePage } from '../pages/talent-home/talent-home';
import { TalentSettingsPage } from '../pages/talent-settings/talent-settings';
import { TalentTabsPage } from '../pages/talent-tabs/talent-tabs';
import { ClientTabsPage } from '../pages/client-tabs/client-tabs';
import { ClientHistoryPage } from '../pages/client-history/client-history';
import { ClientHomePage } from '../pages/client-home/client-home';
import { ClientSettingsPage } from '../pages/client-settings/client-settings';
import { SearchResultPage } from '../pages/search-result/search-result';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { SyncProfilProvider } from '../providers/sync-profil/sync-profil';
import { MatchingPage } from '../pages/matching/matching';
import { ReviewPage } from '../pages/review/review';
import { MatchPage } from '../pages/match/match';
import { SearchChoicePage } from '../pages/search-choice/search-choice';
import { SearchingPage } from '../pages/searching/searching';
import { SorryPage } from '../pages/sorry/sorry';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginHomePage,
    LoginPage,
    RegisterPage,
    TalentHistoryPage,
    TalentHomePage,
    TalentSettingsPage,
    TalentTabsPage,
    ClientTabsPage,
    ClientHistoryPage,
    ClientHomePage,
    ClientSettingsPage,
    SearchResultPage,
    MatchingPage,
    ReviewPage,
    MatchPage,
    SearchChoicePage,
    SearchingPage,
    SorryPage,
    ReviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    LoginHomePage,
    RegisterPage,
    TalentHistoryPage,
    TalentHomePage,
    TalentSettingsPage,
    TalentTabsPage,
    ClientTabsPage,
    ClientHistoryPage,
    ClientHomePage,
    ClientSettingsPage,
    SearchResultPage,
    MatchingPage,
    ReviewPage,
    MatchPage,
    SearchChoicePage,
    SearchingPage,
    SorryPage,
    ReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ProfileProvider,
    GoogleMaps,
    Geolocation,
    SyncProfilProvider
    
  ]
})
export class AppModule {}
