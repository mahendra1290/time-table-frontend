import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService, SidebarState } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  state!: Observable<SidebarState>

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.state = this.sidebarService.state;
  }

  close() {
    this.sidebarService.close();
  }

}