import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeriodComponent } from './add-period/add-period.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
