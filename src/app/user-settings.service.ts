import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Branch } from './models/period';

export interface UserBranchSem {
  branch: Branch;
  sem: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private USER_BRANCH = 'user-branch';
  private USER_SEM = 'user-sem';

  private _userBranch = new BehaviorSubject<Branch | null>(
    this.getUserBranch()
  );

  private _userSem = new BehaviorSubject<string | null>(this.getUserSem());

  private _branchSem = new BehaviorSubject<UserBranchSem | null>(
    this.getBranchSem()
  );

  userBranch: Observable<Branch | null> = this._userBranch.asObservable();

  userSem: Observable<string | null> = this._userSem.asObservable();

  branchSem: Observable<UserBranchSem | null> = this._branchSem.asObservable();

  constructor(private firestore: AngularFirestore) {}

  private getUserBranch(): Branch | null {
    return JSON.parse(localStorage.getItem(this.USER_BRANCH) || 'null');
  }

  private getUserSem(): string | null {
    return JSON.parse(localStorage.getItem(this.USER_SEM) || 'null');
  }

  private getBranchSem(): UserBranchSem | null {
    const branch = this.getUserBranch();
    const sem = this.getUserSem();
    if (branch && sem) {
      return {
        branch: branch,
        sem: sem,
      };
    }
    return null;
  }

  setUserBranch(branch: Branch) {
    localStorage.setItem(this.USER_BRANCH, JSON.stringify(branch));
    this._userBranch.next(branch);
    this._branchSem.next(this.getBranchSem());
  }

  setUserSem(sem: string) {
    localStorage.setItem(this.USER_SEM, JSON.stringify(sem));
    this._userSem.next(sem);
    this._branchSem.next(this.getBranchSem());
  }

  isBranchSemSet(): boolean {
    if (this.getUserBranch() && this.getUserSem()) {
      return true;
    }
    return false;
  }
}
