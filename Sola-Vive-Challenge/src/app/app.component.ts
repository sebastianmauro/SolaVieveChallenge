import { Component } from  '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOMER_SERVICE_RATE_TITLE, EXPERIENCE_RATE_TITLE, PAYMENT_RATE_TITLE } from './constants/sentences';
import { FeedbackSubject } from 'src/enums/feedbackSubject';
import { ResponseCode } from 'src/enums/responseCodes';
import { popUpComponent } from './components/popUp/popUp.component';
import Feedback from './interfaces/feedback.interface';
import { FeedbackService } from './services/feedback.service';
import { RatingAttibutes } from 'src/enums/ratingAttributes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class LoginComponent {

  public comment: string = "";
  public experienceRateText: string;
  public paymentRateText: string;
  public customerServiceRateText: string;
  public feedbackSubject = FeedbackSubject;
  public experienceRate: number = RatingAttibutes.RateBeginnigValue;
  public paymentRate: number = RatingAttibutes.RateBeginnigValue;
  public customerServiceRate: number = RatingAttibutes.RateBeginnigValue;

  constructor(private  dialog:  MatDialog, public feedbackService: FeedbackService) {
    this.experienceRateText = EXPERIENCE_RATE_TITLE;
    this.paymentRateText = PAYMENT_RATE_TITLE;
    this.customerServiceRateText = CUSTOMER_SERVICE_RATE_TITLE;
  }

  setRateOf(aRate: number, feedBackSubject:number){
    if(feedBackSubject === FeedbackSubject.Experience) this.experienceRate = aRate;
    if(feedBackSubject === FeedbackSubject.Payments) this.paymentRate = aRate;
    if(feedBackSubject === FeedbackSubject.CustomerService) this.customerServiceRate = aRate;
  }

  async send(){
    console.log("sending feedback");
    const feedbackToSend: Feedback = {
      experienceRate: this.experienceRate,
      paymentProcessRate: this.paymentRate,
      customerServiceRate: this.customerServiceRate,
      comment:this.comment
    };

    this.feedbackService.saveFeedback(feedbackToSend)
    .then(response=>{
      console.log(response);
      console.log("response");
      this.openSuccesPopUp(); 
    }).catch(error=>{
      this.errorHandler(error);
    });
  }

  openSuccesPopUp(){
    this.dialog.open(popUpComponent,
      { 
        data: { status: ResponseCode.Success},
        width: "40%",
        panelClass:"modal-success"
      }
    );
  }

  openErrorOccurredPopUp(){
    this.dialog.open(popUpComponent,
      { 
        data: { status: ResponseCode.InternalServerError},
        width: "40%",
        panelClass:"modal-success"
      }
    );
  }
    
  errorHandler(error:any){
    console.log(error);
    this.openErrorOccurredPopUp();
  }
}
