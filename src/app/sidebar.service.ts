import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export type SidebarState = "open" | "closed"

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _state: BehaviorSubject<SidebarState> = new BehaviorSubject("closed" as SidebarState)

  state: Observable<SidebarState> = this._state.asObservable();

  open() {
    this._state.next("open");
  }

  close() {
    this._state.next("closed")
  }

  constructor() { }
}
