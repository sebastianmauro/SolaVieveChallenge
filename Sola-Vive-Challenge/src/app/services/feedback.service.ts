import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc } from '@angular/fire/firestore';
import Feedback from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private firestore: Firestore) { }

  saveFeedback(aFeedback: Feedback){
    const feedbacksCollectionRefence = collection(this.firestore, 'feedbacks');
    return addDoc(feedbacksCollectionRefence, aFeedback);
  }
}
