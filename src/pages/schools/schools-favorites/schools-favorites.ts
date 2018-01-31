import { NavController } from 'ionic-angular';
import { SchoolDetailsPage } from './../school-details/school-details';
import { Component, OnInit } from '@angular/core';
import { School } from './../../../dataModels/education/school';
import { SchoolService } from './../../../services/schools/school.service';

@Component({
  selector: 'page-schools-favorites',
  templateUrl: 'schools-favorites.html'
})
export class SchoolsFavoritesPage implements OnInit {
  public schoolsFavoritesList: School[] = [];

  constructor(private shoolsService: SchoolService,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.schoolsFavoritesList = this.shoolsService.getFavoritesList();
  }

  public onSchoolSelect(school: School) {
    this.navCtrl.push(SchoolDetailsPage, { school: school });
  }
}