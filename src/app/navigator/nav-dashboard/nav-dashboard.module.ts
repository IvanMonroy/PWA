import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module'

import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {SubMenuComponent, DialogOverviewExampleDialog, BottomSheetOverviewExampleSheet, MessageResponse} from './nav-menu/sub-menu'

@NgModule({
  declarations: [
    NavHeaderComponent,
    NavMenuComponent,
    SubMenuComponent,
    DialogOverviewExampleDialog,
    BottomSheetOverviewExampleSheet,
    MessageResponse
  ],
  exports: [
    NavHeaderComponent,
    NavMenuComponent,
    SubMenuComponent,
    DialogOverviewExampleDialog,
    BottomSheetOverviewExampleSheet,
    MessageResponse
  ],
  entryComponents:  [
    DialogOverviewExampleDialog,
    BottomSheetOverviewExampleSheet,
    MessageResponse
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatBottomSheetModule,
    FormsModule,
    MatDialogModule
  ]
})
export class NavDashboardModule { }
