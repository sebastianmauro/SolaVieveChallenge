import { Component, OnInit } from  '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FeedbackSubject } from 'src/enums/feedbackSubject';
import { popUpComponent } from './components/popUp/popUp.component';
import Feedback from './interfaces/feedback.interface';
import { FeedbackService } from './services/feedback.service';

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
  experienceRate: number = 0;
  paymentRate: number = 0;
  customerServiceRate: number = 0;

  constructor(private  dialog:  MatDialog, private  router:  Router, private feedbackService: FeedbackService) {
    this.experienceRateText="Rate your experience from 0 to 5 stars:";
    this.paymentRateText="How satisfied are you with the payment process?";
    this.customerServiceRateText="How satisfied are you with our customer service?";
  }
  setRateOf(aRate: number, feedBackSubject:number){
    if(feedBackSubject == FeedbackSubject.Experience) this.experienceRate = aRate;
    if(feedBackSubject == FeedbackSubject.Payments) this.paymentRate = aRate;
    if(feedBackSubject == FeedbackSubject.CustomerService) this.customerServiceRate = aRate;
  }
    async send(){
      console.log("sending feedback");
      const feedbackToSend: Feedback = {
        experienceRate: this.experienceRate,
        paymentProcessRate: this.paymentRate,
        customerServiceRate: this.customerServiceRate,
        comment:"five stars on everything"
      };
      const response = await this.feedbackService.saveFeedback(feedbackToSend);
      console.log(response);
      this.openSuccesPopUp(); 
    }

    openSuccesPopUp(){
      this.dialog.open(popUpComponent,
        { 
          data: { message:  "success!!!"},
          width: "40%",
          panelClass:"modal-success"
        }
      );
    }
}
