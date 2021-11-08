import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  autoscroll = new FormControl(localStorage.getItem('auto-scroll') || 'Off');

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
    if (!localStorage.getItem('auto-scroll')) {
      localStorage.setItem('auto-scroll', this.autoscroll.value);
    }
    this.autoscroll.valueChanges.subscribe((val) => {
      localStorage.setItem('auto-scroll', val);
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
