import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-frontend';

  constructor(public authService: AngularFireAuth) {}

  login() {
    // this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    // this.authService.signOut();
  }
}
