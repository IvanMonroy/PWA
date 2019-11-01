import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  public title: string = "IHR Parking";
  @Output() toggleEmit = new EventEmitter<any>();
  @Input() medyaQueryParent: MediaQueryList;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.toggleEmit.next(null);
  }

}
