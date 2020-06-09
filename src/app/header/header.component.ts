import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  animal: string;
  name: string;
  @Input() activeTab: string;
  @Output() activeTabChanged = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  changeActiveTab(tab: string) {
    this.activeTabChanged.emit(tab);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onClickApply(): void {
    this.dialogRef.close();
  }
}