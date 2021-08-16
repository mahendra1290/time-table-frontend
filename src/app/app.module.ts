import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPeriodComponent } from './add-period/add-period.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { MinutesTimePipe } from './minutes-time.pipe';
import { PeriodBlockComponent } from './period-block/period-block.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPeriodComponent,
    MultiSelectComponent,
    TimeTableComponent,
    MinutesTimePipe,
    PeriodBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
