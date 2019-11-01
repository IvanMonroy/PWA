import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  mobileQuery: MediaQueryList;
  public fillerNav: any[] = [];
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.fillerNav = [
      {
        name: " Vehículos",
        route: "vehicles"
      },
      {
        name: " Entradas",
        route: "entries"
      },
      {
        name: " Salidas",
        route: "exits"
      },
      {
        name: " Tarifas",
        route: "rates"
      }
    ];
    console.log(this.fillerNav);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
