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
  sems = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  editSemester() {
    this.editSem = true;
    console.log(this.semSelector);
  }

  setBranch() {
    this.editBranch = true;
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

  constructor() {}
}
