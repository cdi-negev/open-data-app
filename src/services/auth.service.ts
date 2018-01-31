import firebase from 'firebase';

export class AuthService {

  public getActiveUser() {
    return firebase.auth().currentUser;
  }
}