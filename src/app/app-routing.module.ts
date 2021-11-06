import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeriodComponent } from './add-period/add-period.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { TimeTableComponent } from './time-table/time-table.component';

const routes: Routes = [
  {
    path: '',
    component: TimeTableComponent,
  },
  {
    path: 'add-period',
    component: AddPeriodComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
