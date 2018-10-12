import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorryPage } from './sorry';

@NgModule({
  declarations: [
    SorryPage,
  ],
  imports: [
    IonicPageModule.forChild(SorryPage),
  ],
})
export class SorryPageModule {}
