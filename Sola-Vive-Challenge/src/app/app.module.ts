import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { MainComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { popUpComponent } from './components/popUp/popUp.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FiveStarsComponent } from './components/five-stars/five-stars.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';

@NgModule({
  declarations: [
    MainComponent,
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({name: 'TEST'}),
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
