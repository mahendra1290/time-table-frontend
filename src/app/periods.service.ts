import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
  periodsCollection!: AngularFirestoreCollection<Period>;
  periods!: Observable<Period[]>;

  constructor(private httpClient: HttpClient, private firestore: AngularFirestore) {
    this.periodsCollection = this.firestore.collection<Period>('/periods');
    this.periods = this.periodsCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Period
        })
      })
    );
  }

  public addPeriod(period: Period) {
    return this.firestore.collection<Period>('/periods').add(period)
  }

  getPeriods(): Observable<Period[]> {
    return this.firestore.collection<Period>('/periods').valueChanges()
  }

  deletePeriod(id: string) {
    return this.periodsCollection.doc(id).delete()
  }

  updatePeriod(period: Period): Observable<PeriodsApiResponse> {
    console.log(period);
    return this.httpClient.put<PeriodsApiResponse>(
      `${'huhu'}/${period.id}`,
      period
    );
  }
}
