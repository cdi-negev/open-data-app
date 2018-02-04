import { AgmCoreModule } from '@agm/core';
import { SchoolsFavoritesPage } from './schools-favorites/schools-favorites';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { SchoolDetailsPage } from './school-details/school-details';
import { SchoolService } from './../../services/schools/school.service';
import { SchoolsListPage } from './schools-list/schools-list';

@NgModule({
  declarations: [
    SchoolsListPage,
    SchoolDetailsPage,
    SchoolsFavoritesPage
  ],
  entryComponents: [
    SchoolsListPage,
    SchoolDetailsPage,
    SchoolsFavoritesPage
  ],
  providers: [
    SchoolService
  ],
  imports: [
    IonicPageModule.forChild(SchoolsListPage),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1Rmd7g80bR6yVpF8bJ1-56aZWbe3U77g'
    })
  ],
})
export class SchoolsListPageModule { }
