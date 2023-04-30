import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import Feedback from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private firestore: Firestore) { }

  saveFeedback(aFeedback: Feedback): any{
    const feedbacksCollectionRefence = collection(this.firestore, 'feedbacks');
    return addDoc(feedbacksCollectionRefence, aFeedback);
  }

  async getFeedback(): Promise<Feedback[]>{
    const feedbacksCollectionRefence = collection(this.firestore, 'feedbacks');
    const res = collectionData(feedbacksCollectionRefence, {idField: 'id'}) as Observable<Feedback[]>;
    return firstValueFrom(res);
  }
}
