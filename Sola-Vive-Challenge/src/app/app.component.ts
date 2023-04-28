import { Component, OnInit } from  '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { popUpComponent } from './popUp/popUp.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class LoginComponent {
  public comment: string = "";
  public firstRateText: string;
  public secondRateText: string;
  public thirdRateText: string;
  constructor(private  dialog:  MatDialog, private  router:  Router) {
    this.firstRateText="Rate your experience from 0 to 5 stars:"
    this.secondRateText="How satisfied are you with the payment process?"
    this.thirdRateText="How satisfied are you with our customer service?"
  }
    send(){
      this.dialog.open(popUpComponent,{ data: {
        message:  "success!!!"
      },
      width: "40%",
    panelClass:"modal-success"});
    }
}
