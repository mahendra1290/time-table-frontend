import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { BranchSemOptions } from './admin/admin.component';

@Injectable({
  providedIn: 'root',
})
export class BranchSemOptionsResolver implements Resolve<BranchSemOptions> {
  branchSemOptionsCollection = this.firestore.collection<BranchSemOptions>(
    '/branch-sem-options'
  );

  branchSemOptions: BranchSemOptions = {
    branches: [],
    semesters: [],
  };

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BranchSemOptions> {
    return this.branchSemOptionsCollection
      .get()
      .pipe(
        map((val) => (val.empty ? this.branchSemOptions : val.docs[0].data()))
      );
  }

  constructor(private firestore: AngularFirestore) {}
}
