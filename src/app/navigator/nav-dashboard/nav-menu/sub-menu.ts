import { Component, Input, Inject } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
@Component({
  selector: "sub-menu",
  template: `
    <ng-container
      *ngTemplateOutlet="
        !medyaQueryParent.matches ? not_responsive : responsive
      "
    >
    </ng-container>
    <ng-template #not_responsive let-lessonsCounter="estimate">
      <button mat-icon-button>
        <mat-icon
          class="example-icon"
          aria-hidden="false"
          matBadge="0"
          matBadgeColor="warn"
          (click)="openBottomSheet()"
          >notification_important</mat-icon
        >
      </button>
      <button mat-icon-button (click)="openDialog(null)">
        <mat-icon mat-icon-button class="example-icon" aria-hidden="false"
          >exit_to_app</mat-icon
        >
      </button>
    </ng-template>
    <ng-template #responsive let-lessonsCounter="estimate">
      <button mat-menu-item (click)="openBottomSheet()">
        <mat-icon
          class="example-icon"
          aria-hidden="false"
          matBadge="4"
          matBadgeColor="warn"
          >notification_important</mat-icon
        >
        Notificaciones
      </button>
      <button mat-menu-item (click)="openDialog()">
        <mat-icon mat-icon-button class="example-icon" aria-hidden="false"
          >exit_to_app</mat-icon
        >
        Salir
      </button>
    </ng-template>
  `,
  styleUrls: ["./nav-menu.component.scss"]
})
export class SubMenuComponent {
  @Input() medyaQueryParent: MediaQueryList;
  @Input() varl: string = "mat-menu-item";
  constructor(private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {}

  animal: string;
  name: string = 'Confirmación';

  ngOnInit() {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  template: `
    <mat-nav-list>
      <a
        href="https://keep.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Keep</span>
        <span mat-line>Add to a note</span>
      </a>

      <a
        href="https://docs.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Docs</span>
        <span mat-line>Embed in a document</span>
      </a>

      <a
        href="https://plus.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Plus</span>
        <span mat-line>Share with your friends</span>
      </a>

      <a
        href="https://hangouts.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Hangouts</span>
        <span mat-line>Show to your coworkers</span>
      </a>
    </mat-nav-list>
  `,
  styleUrls: ["./nav-menu.component.scss"]
})
export class BottomSheetOverviewExampleSheet {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "dialog-overview-example-dialog",
  template: `
    <h1 mat-dialog-title>{{ data.name }}</h1>
    <div mat-dialog-content>
      <p>¿Desea Salir?</p>
      
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>
        Confirmar
      </button>
    </div>
  `,
  styleUrls: ["./nav-menu.component.scss"]
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: "message-response",
  template: `
    <h1 mat-dialog-title>Información</h1>
    <div mat-dialog-content>
      <p>{{message}}</p>
      
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Ok</button>
    </div>
  `,
  styleUrls: ["./nav-menu.component.scss"]
})
export class MessageResponse {
  message: any;
  constructor(
    public dialogRef: MatDialogRef<MessageResponse>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
      this.message = data['message']
      console.log(data);


    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
