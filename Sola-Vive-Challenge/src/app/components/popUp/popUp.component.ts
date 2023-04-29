import { Component, Inject } from  '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { NOT_OK_IMG_SOURCE, OK_IMG_SOURCE } from 'src/app/statics/imgSources';
import { NOT_OK_FIRST_SENTENCE, NOT_OK_SECOND_SENTENCE, OK_FIRST_SENTENCE, OK_SECOND_SENTECE } from 'src/app/statics/sentences';
import { ResponseCode } from 'src/enums/responseCodes';

@Component({
selector: 'popUp',
templateUrl:  'popUp.component.html'
})
export  class  popUpComponent {
    public firstSentence: string;
    public secondSentence: string;
    public imgSource: string = "";
    
    constructor(public  dialogRef:  MatDialogRef<popUpComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
        if(data.status === ResponseCode.Success){
            this.imgSource = OK_IMG_SOURCE;
            this.firstSentence = OK_FIRST_SENTENCE;
            this.secondSentence = OK_SECOND_SENTECE;
        }else{
            this.imgSource = NOT_OK_IMG_SOURCE;
            this.firstSentence = NOT_OK_FIRST_SENTENCE;
            this.secondSentence = NOT_OK_SECOND_SENTENCE;
        }
    }

    public closeMe() {
        this.dialogRef.close();
    }
}
