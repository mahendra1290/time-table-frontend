import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeriodComponent } from './add-period/add-period.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { BranchSemOptionsResolver } from './branch-sem-options.resolver';
import { BranchSemSelectedGuard } from './branch-sem-selected.guard';
import { ProfileComponent } from './profile/profile.component';
import { TimeTableComponent } from './time-table/time-table.component';

const routes: Routes = [
  {
    path: '',
    component: TimeTableComponent,
    canActivate: [BranchSemSelectedGuard],
  },
  {
    path: 'add-period',
    component: AddPeriodComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { branchSemOptions: BranchSemOptionsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
