import { SchoolService } from './../../../services/schools/school.service';
import { School } from './../../../dataModels/education/school';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-school-details',
  templateUrl: 'school-details.html',
})
export class SchoolDetailsPage implements OnInit {
  public school: School;
  public schoolIcon: string;
  public schoolFavorit: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private schoolService: SchoolService,
    private viewCtrl: ViewController) { }

  ngOnInit() {
    this.viewCtrl.setBackButtonText('חזרה');
    this.school = this.navParams.get('school');
    if (this.school.type === 'בית ספר') {
      this.schoolIcon = "school";
    } else if (this.school.type == 'מרכז מדעים') {
      this.schoolIcon = "flask";
    }
    else {
      this.schoolIcon = "contacts";
    }
    this.schoolFavorit = this.schoolService.isInFavorites(this.school);
  }

  public onAddToFavorite() {
    this.schoolService.addToFavorites(this.school);
    this.schoolFavorit = true;
  }

  public onUnfavorite() {
    this.schoolService.removeFromFavorites(this.school);
    this.schoolFavorit = false;
  }

}
