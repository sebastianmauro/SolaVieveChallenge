import {Component, Inject, Injectable} from  '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';


@Component({
selector: 'popUp',
templateUrl:  'popUp.component.html'
})
export  class  popUpComponent {
    public mainText:string;
    constructor(private  dialogRef:  MatDialogRef<popUpComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
        this.mainText = data.message;
    }
    public  closeMe() {

        this.dialogRef.close();
    }
}
