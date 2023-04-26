import { Component, OnInit } from  '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class LoginComponent {
  public  email:  string  =  "";
  public  password:  string  =  "";
  public max = 5;
  public rate = 2;
  public isReadonly = false;
  constructor(private  dialog:  MatDialog, private  router:  Router) { }
    login(){
        if(this.email  ===  "email@email.com"  &&  this.password  === "p@ssw0rd")
        {
            this.router.navigate(['success']);
        }
        else
        {
            this.dialog.open(MessageComponent,{ data: {
            message:  "Error!!!"
            }});
        }
    }
}
