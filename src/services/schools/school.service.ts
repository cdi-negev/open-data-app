import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { School } from './../../dataModels/education/school';

@Injectable()
export class SchoolService {
  private serverAddress = "https://schools-db-31ab9.firebaseio.com/";
  private schoolsList: School[] = [];
  private favoritesSchools: School[] = [];

  constructor(private httpClient: Http) { }

  //load data from firebase
  public loadScolls(token: string) {
    return this.httpClient.get(this.serverAddress + "schools-list.json?auth=" + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((schools: School[]) => {
        if (schools) {
          this.schoolsList = schools.sort((item1, item2) => {
            if (item1.name > item2.name) return 1;
            if (item1.name < item2.name) return -1;
            return 0;
          })
        } else {
          this.schoolsList = [];
        }
      });
  }

  public storeSchools(token: string) {

    return this.httpClient.put(this.serverAddress + "schools-list.json?auth=" + token, this.schoolsList)
      .map((response: Response) => {
        return response.json();
      });
  }

  public getSchoolsList(): School[] {
    return this.schoolsList.slice();
  }

  public getFavoritesList(): School[] {
    return this.favoritesSchools;
  }

  public addToFavorites(school: School) {
    this.favoritesSchools.push(school);
  }

  public removeFromFavorites(shcool: School) {
    let posision = this.favoritesSchools.findIndex((item) => {
      return shcool.id == item.id;
    });
    this.favoritesSchools.splice(posision, 1);
  }

  public isInFavorites(school: School): boolean {
    let favoSchool = this.favoritesSchools.find((item) => {
      return school.id == item.id;
    });
    if (favoSchool) {
      return true;
    }
    return false;
  }
}