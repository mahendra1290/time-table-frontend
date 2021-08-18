import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PeriodsApiResponse } from './api/response';
import { Period } from './models/period';

const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  periodUrl = `${BASE_URL}/periods`;

  constructor(private httpClient: HttpClient) {}

  public addPeriod(
    period: Omit<Period, '_id'>
  ): Observable<PeriodsApiResponse> {
    return this.httpClient.post<PeriodsApiResponse>(this.periodUrl, period);
  }

  getPeriods(): Observable<Period[]> {
    return this.httpClient
      .get<PeriodsApiResponse>(this.periodUrl)
      .pipe(map((val) => val.periods));
  }

  deletePeriod(id: string): Observable<PeriodsApiResponse> {
    return this.httpClient.delete<PeriodsApiResponse>(
      `${this.periodUrl}/${id}`
    );
  }

  updatePeriod(period: Period): Observable<PeriodsApiResponse> {
    console.log(period);
    return this.httpClient.put<PeriodsApiResponse>(
      `${this.periodUrl}/${period._id}`,
      period
    );
  }
}
