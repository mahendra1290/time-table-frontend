import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PeriodsApiResponse } from './api/response';
import { Period } from './models/period';
import { UserSettingsService } from './user-settings.service';

const BASE_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  periodsCollection!: AngularFirestoreCollection<Period>;
  periods!: Observable<Period[]>;

  constructor(
    private httpClient: HttpClient,
    private firestore: AngularFirestore,
    private userSettingsService: UserSettingsService
  ) {
    this.periodsCollection = this.firestore.collection<Period>('/periods');
    const periodsCollectionQueryObservable =
      this.userSettingsService.branchSem.pipe(
        switchMap((branchSem) => {
          return this.firestore
            .collection<Period>('/periods', (ref) =>
              ref
                .where('branch', '==', branchSem?.branch.code)
                .where('semester', '==', branchSem?.sem)
            )
            .snapshotChanges();
        })
      );

    this.periods = periodsCollectionQueryObservable.pipe(
      map((action) => {
        return action.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Period;
        });
      })
    );
  }

  public addPeriod(periods: Period[]) {
    const periodAddPromises: Promise<any>[] = [];
    for (let period of periods) {
      periodAddPromises.push(
        this.firestore.collection<Period>('/periods').add(period)
      );
    }
    return Promise.all(periodAddPromises);
  }

  deletePeriod(id: string): Promise<void> {
    return this.periodsCollection.doc(id).delete();
  }

  updatePeriod(period: Period): Promise<void> {
    return this.periodsCollection.doc(period.id).set(period);
  }
}
