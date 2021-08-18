import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSelect } from '@angular/material/select';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular-frontend';

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

  constructor(public authService: AngularFireAuth) {}

  login() {
    this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.authService.signOut();
  }
}
