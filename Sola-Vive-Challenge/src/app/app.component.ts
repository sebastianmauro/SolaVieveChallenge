import { Component } from  '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOMER_SERVICE_RATE_TITLE, EXPERIENCE_RATE_TITLE, GET_COLLECTION_ERROR_LOG, PAYMENT_RATE_TITLE } from './constants/sentences';
import { FeedbackSubject } from 'src/enums/feedbackSubject';
import { ResponseCode } from 'src/enums/responseCodes';
import { popUpComponent } from './components/popUp/popUp.component';
import Feedback from './interfaces/feedback.interface';
import { FeedbackService } from './services/feedback.service';
import { RatingAttibutes } from 'src/enums/ratingAttributes';
import { Store } from '@ngrx/store';
import { loadedFeedback, loadFeedback } from './state/actions/items.actions';
import { Observable } from 'rxjs';
import { selectFeedbacksLoading } from './state/selectors/feedbacks.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class MainComponent {
  loading$: Observable<boolean> = this.store.select(selectFeedbacksLoading);
  public comment: string = "";
  public experienceRateText: string;
  public paymentRateText: string;
  public customerServiceRateText: string;
  public feedbackSubject = FeedbackSubject;
  public experienceRate: number = RatingAttibutes.RateBeginnigValue;
  public paymentRate: number = RatingAttibutes.RateBeginnigValue;
  public customerServiceRate: number = RatingAttibutes.RateBeginnigValue;

  constructor(private  dialog:  MatDialog, public feedbackService: FeedbackService, private store: Store<any>) {
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
    this.loading$ = this.store.select(selectFeedbacksLoading);
    this.store.dispatch(loadFeedback());
    const feedbackToSend: Feedback = {
      experienceRate: this.experienceRate,
      paymentProcessRate: this.paymentRate,
      customerServiceRate: this.customerServiceRate,
      comment:this.comment
    };
    await this.feedbackService.saveFeedback(feedbackToSend)
    .then((response: any)=>{
      this.openSuccesPopUp(); 
    }).catch((error: any)=>{
      this.errorHandler(error);
    });
  }

  async printOnConsole(){
    await this.feedbackService.getFeedback()
    .then((collection: any)=>{
      this.store.dispatch(loadedFeedback({addenFeedback:{experienceRate:1, paymentProcessRate:1, customerServiceRate:1}}))
      console.log(collection);
    })
    .catch((error: any)=>{
      console.log(GET_COLLECTION_ERROR_LOG, error);
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
