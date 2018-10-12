import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchChoicePage } from './search-choice';

@NgModule({
  declarations: [
    SearchChoicePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchChoicePage),
  ],
})
export class SearchChoicePageModule {}
