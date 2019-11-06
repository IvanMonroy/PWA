import { Component, ViewChild, } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  constructor(media: MediaMatcher, private swUpdate: SwUpdate) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
  }

  ngAfterViewInit(){}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("New version available. Load New Version?")) {

              window.location.reload();
          }
      });
  }        

  }

  emitAction(e){
    this.sidenav.toggle();
    console.log("emitAction(e)");
  }
  getMobileQuery(){
    return this.mobileQuery;
  }
}
