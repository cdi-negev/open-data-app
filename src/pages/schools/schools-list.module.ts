import { SchoolsFavoritesPage } from './schools-favorites/schools-favorites';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

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
  ],
})
export class SchoolsListPageModule { }
