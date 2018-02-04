import { NavController, ViewController, LoadingController } from 'ionic-angular';
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

  constructor(
    private shoolsService: SchoolService,
    private loaderCtrl: LoadingController,
    public navCtrl: NavController,
    private viewCtrl: ViewController) { }

  ngOnInit() {
    this.viewCtrl.setBackButtonText('חזרה');

  }
  ionViewWillEnter() {
    const loader = this.loaderCtrl.create({
      content: '....טוען מועדפים'
    });
    loader.present();

    this.shoolsService.getFavoritesList()
      .then((schools: School[]) => {
        this.schoolsFavoritesList = schools;
        loader.dismiss();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public onSchoolSelect(school: School) {
    this.navCtrl.push(SchoolDetailsPage, { school: school });
  }
}