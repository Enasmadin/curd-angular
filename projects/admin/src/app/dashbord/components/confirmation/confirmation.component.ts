import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef ,MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  [x: string]: any;
  constructor( public mataDialog:MatDialog ,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    ){}
  confirm(){
    this.mataDialog.closeAll()
  }
  close(){
    this.dialogRef.close();
   }

}
