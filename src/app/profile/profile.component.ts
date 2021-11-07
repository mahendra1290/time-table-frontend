import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchSemOptions } from '../admin/admin.component';
import { Branch } from '../models/period';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  branchSemOptions!: BranchSemOptions;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userSettingsService: UserSettingsService
  ) {}

  selectedBranch?: Branch;
  selectedSem?: string;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.branchSemOptions = data.branchSemOptions;
      console.log(data);
    });
    this.userSettingsService.branchSem.subscribe((branchSem) => {
      this.selectedBranch = branchSem
        ? branchSem.branch
        : this.branchSemOptions.branches[0];
      this.selectedSem = branchSem
        ? branchSem.sem
        : this.branchSemOptions.semesters[0];
    });
  }

  setBranchSem(branch: string, sem: string) {
    const [code, label] = branch.split('|');
    this.userSettingsService.setUserBranch(
      this.branchSemOptions.branches.filter((br) => br.code == code)[0]
    );
    this.userSettingsService.setUserSem(sem);
    this.router.navigateByUrl('/');
  }
}
