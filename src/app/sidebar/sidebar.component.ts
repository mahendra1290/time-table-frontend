import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from '../auth.service';
import { SidebarService, SidebarState } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  state!: Observable<SidebarState>;

  constructor(private sidebarService: SidebarService, public auth: AuthService) {}

  ngOnInit(): void {
    this.state = this.sidebarService.state;
  }

  close() {
    this.sidebarService.close();
  }
}
