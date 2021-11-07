import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchSemOptions } from '../admin/admin.component';
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

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.branchSemOptions = data.branchSemOptions;
      console.log(data);
    });
  }

  setBranchSem(branch: string, sem: string) {
    const [code, label] = branch.split('|');
    this.userSettingsService.setUserBranch({ code: code, label: label });
    this.userSettingsService.setUserSem(sem);
    this.router.navigateByUrl('/');
  }
}
