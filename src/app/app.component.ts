import { Component, ViewChild, AfterContentInit, AfterViewInit, } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterContentInit {
  mobileQuery: MediaQueryList;
  isShow = true;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  constructor(media: MediaMatcher, private swUpdate: SwUpdate) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    
  }
  ngOnInit() {
      if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("Hay una nueva versión disponible, recargar ahora?")) {

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
  ngAfterContentInit(){ 
  
  }

}
