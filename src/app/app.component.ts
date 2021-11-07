import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BranchSemOptions } from './admin/admin.component';
import { Branch } from './models/period';
import { SidebarService } from './sidebar.service';
import { UserSettingsService } from './user-settings.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';

  readonly VAPID_PUBLIC_KEY =
    'BJ7DGYT1XzH-anNghEtE2Os9dtTvZScIMvcnmWzuXZDLodA1mOO168J86ok3tC8yr87wJ0NZmM2J33zo_6Bmutk';

  branchSemOptionsCollection = this.firestore.collection<BranchSemOptions>(
    '/branch-sem-options'
  );

  branchSemOptions: BranchSemOptions = {
    branches: [],
    semesters: [],
  };

  login() {
    // this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    // this.authService.signOut();
  }
  setSemester(sem: string) {
    this.userSettingsService.setUserSem(sem);
  }

  setBranch(code: string) {
    const branch = this.branchSemOptions.branches.filter(
      (br) => br.code == code
    )[0];
    this.userSettingsService.setUserBranch(branch);
  }

  sem: string | null = null;

  branch: Branch | null = null;

  openSidebar() {
    this.sidebarService.open();
  }

  constructor(
    private sidebarService: SidebarService,
    private firestore: AngularFirestore,
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit() {
    this.userSettingsService.userBranch.subscribe((branch) => {
      this.branch = branch;
    });
    this.userSettingsService.userSem.subscribe((sem) => {
      console.log(sem);

      this.sem = sem;
    });
    this.branchSemOptionsCollection.get().subscribe((options) => {
      if (!options.empty) {
        this.branchSemOptions = options.docs[0].data();
      }
    });
  }
}
