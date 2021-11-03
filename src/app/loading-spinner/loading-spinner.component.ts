import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <p class="h-8 w-8 border-4 border-t-4 border-t-gray-600 animate-spin border-gray-400 rounded-full"></p>
  `,
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
