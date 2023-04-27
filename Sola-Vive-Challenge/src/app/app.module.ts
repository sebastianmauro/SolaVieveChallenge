import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { popUpComponent } from './popUp/popUp.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FiveStarsComponent } from './five-stars/five-stars.component';

@NgModule({
  declarations: [
    LoginComponent,
    popUpComponent,
    FiveStarsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule { }