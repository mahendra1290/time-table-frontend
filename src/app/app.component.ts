import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSelect } from '@angular/material/select';
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
  sems = ['1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem'];

  login() {
    // this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    // this.authService.signOut();
  }
  editSemester() {
    this.editSem = true;
    console.log(this.semSelector);
  }

  setBranch() {
    this.editBranch = true;
  }

  branchs = [
    'Computer Engineering',
    'Civil Engineering',
    'Information Techology Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Electronics & Communication Engineering',
  ];

  sem: string = this.sems[0];

  branch: string = this.branchs[0];

  constructor() { }
}
