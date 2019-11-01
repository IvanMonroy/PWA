import { Component, ViewChild, } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from '@angular/material';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
  }

  ngAfterViewInit(){}

  ngOnInit() {}

  emitAction(e){
    this.sidenav.toggle();
    console.log("emitAction(e)");
  }
  getMobileQuery(){
    return this.mobileQuery;
  }
}
