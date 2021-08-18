import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSelect } from '@angular/material/select';
import { SwPush } from '@angular/service-worker';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { MessagingService } from './messaging.service';
firebase.initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular-frontend';

  readonly VAPID_PUBLIC_KEY =
    'BJ7DGYT1XzH-anNghEtE2Os9dtTvZScIMvcnmWzuXZDLodA1mOO168J86ok3tC8yr87wJ0NZmM2J33zo_6Bmutk';

  @ViewChild('sem_select')
  semSelector!: MatSelect;

  @ViewChild('branch_select')
  branchSelector!: MatSelect;

  editSem: boolean = false;

  editBranch: boolean = false;
  sems = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  editSemester() {
    this.editSem = true;
    // this.semSelector.open();
    console.log(this.semSelector);
  }

  setBranch() {
    this.editBranch = true;
    // this.branchSelector.open();
    // console.log(this.semSelector);
  }

  branchs = [
    'Computer',
    'Civil',
    'Information Techology',
    'Mechanical',
    'Electrical',
    'Electronics & Communication',
  ];

  sem: string = this.sems[0];

  branch: string = this.branchs[0];

  constructor(
    public authService: AngularFireAuth,
    private swPush: SwPush,
    private msgService: MessagingService
  ) {
    const messaging = firebase.messaging();
    swPush.messages.subscribe((val) => console.log(val));
    navigator.serviceWorker.getRegistration().then((registration) => {
      console.log(registration);
      messaging
        .getToken({
          vapidKey: this.VAPID_PUBLIC_KEY,
          serviceWorkerRegistration: registration,
        })
        .then((token) => {
          console.log(token);
          this.msgService.subscribeToNotification(token);
        });
    });
  }

  login() {
    // this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => console.log(sub))
      .catch((err) =>
        console.error('Could not subscribe to notifications', err)
      );
  }

  logout() {
    this.authService.signOut();
  }
}
