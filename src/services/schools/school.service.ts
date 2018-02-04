import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage'
import 'rxjs/Rx';
import { School } from './../../dataModels/education/school';

@Injectable()
export class SchoolService {
  private serverAddress = "https://schools-db-31ab9.firebaseio.com/";
  private schoolsList: School[] = [];
  private favoritesSchools: School[] = [];
  private token: string;

  constructor(
    private httpClient: Http,
    private storage: Storage) { }

  //load data from firebase
  public loadScolls(token: string) {
    this.token = token;
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

  // public loadSchoolsFromOpenData() {
  //   const address = 'http://opendata.br7.org.il/datasets/geojson/EducationalInstitutions.geojson';
  //   return this.httpClient.get(address)
  //     .map((response: Response) => {
  //       return response.json();
  //     });
  // }

  public storeSchools(token: string) {

    return this.httpClient.put(this.serverAddress + "schools-list.json?auth=" + token, this.schoolsList)
      .map((response: Response) => {
        return response.json();
      });
  }

  public getSchoolsList(): School[] {
    return this.schoolsList.slice();
  }

  public getFavoritesList() {
    return this.storage.get('favoritesSchools')
      .then((schools: School[]) => {
        this.favoritesSchools = schools != null ? schools : [];
        return this.favoritesSchools.slice();
      })
      .catch((error) => {
        console.log(error);
      });
    // return this.favoritesSchools;
  }

  public addToFavorites(school: School) {
    this.favoritesSchools.push(school);
    this.storage.set('favoritesSchools', this.favoritesSchools)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        let posision = this.favoritesSchools.findIndex((item) => {
          return school.id == item.id;
        });
        this.favoritesSchools.splice(posision, 1);
      });
  }

  public removeFromFavorites(shcool: School) {
    let posision = this.favoritesSchools.findIndex((item) => {
      return shcool.id == item.id;
    });
    this.favoritesSchools.splice(posision, 1);

    this.storage.set('favoritesSchools', this.favoritesSchools)
      .then((data) => {
        console.log('save favorites schools to storage');
      })
      .catch((error) => {
        console.log(error);
      });

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