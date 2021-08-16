import { HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent implements OnInit {
  selected: Set<string> = new Set<string>();

  optionVisible: boolean = false;

  searchString = new FormControl('');

  private _searchString = new BehaviorSubject<string>('');

  @Input()
  options: string[] = [];

  $filteredOptions: Observable<string[]> = new Observable<string[]>();

  constructor() {
    console.log(this.options);
  }

  toggleOptions() {
    console.log('heelo');
    this.optionVisible = !this.optionVisible;
  }

  @HostListener('document:click', ['$event'])
  outsideClick(event: PointerEvent) {
    // if (this.optionVisible) {
    this.optionVisible = false;
    this.searchString.setValue('');
    // }
  }

  toggle($event: Event, value: string) {
    $event.stopPropagation();
    if (this.selected.has(value)) {
      this.selected.delete(value);
    } else {
      this.selected.add(value);
    }
  }

  ngOnInit(): void {
    this.searchString.valueChanges.subscribe((val) =>
      this._searchString.next(val)
    );

    this.$filteredOptions = this._searchString.pipe(
      map((val: string) =>
        this.options.filter(
          (v) => val === '' || v.toLowerCase().includes(val.toLowerCase())
        )
      )
    );
  }
}
