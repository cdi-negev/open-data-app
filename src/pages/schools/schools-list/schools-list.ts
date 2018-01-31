import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { School } from './../../../dataModels/education/school';
import { SchoolService } from './../../../services/schools/school.service';
import { SchoolDetailsPage } from './../school-details/school-details';
import { SchoolsFavoritesPage } from './../schools-favorites/schools-favorites';

// @IonicPage()
@Component({
  selector: 'page-schools-list',
  templateUrl: 'schools-list.html',
})
export class SchoolsListPage implements OnInit {
  public schoolsList: School[] = [];
  private clearOnce: boolean = false;

  constructor(
    private schoolService: SchoolService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private authServise: AuthService,
    private loaderCtrl: LoadingController) { }

  ngOnInit() {
    let loader = this.loaderCtrl.create({
      content: 'טוען נתונים....'
    });
    loader.present();
    this.authServise.getActiveUser().getIdToken()
      .then((token: string) => {
        this.schoolService.loadScolls(token)
          .subscribe((schools: School[]) => {
            this.schoolsList = schools;
            loader.dismiss();
          })
      }, (error) => {
        console.log(error);
      });
  }

  public onSchoolSelect(school: School): void {
    console.log(school);
    this.navCtrl.push(SchoolDetailsPage, { school: school });
  }

  public filterItems(event) {
    let value: string = event.srcElement.value;
    this.clearOnce = false;
    if (value && value.trim() != '') {
      this.schoolsList = this.schoolsList.filter((item: School) => {
        return item.name.includes(value.trim());
      });
    }
  }

  public onCancel() {
    console.log('Cancel Serch');

  }
  public onClear() {
    //ionClear run twice, bug ???
    if (!this.clearOnce) {
      this.clearOnce = true;
      this.schoolsList = this.schoolService.getSchoolsList();
      console.log('Clear Serch');
    }
  }

  public onShowFavorites() {
    console.log('show favorites');
    this.navCtrl.push(SchoolsFavoritesPage);
  }
}
