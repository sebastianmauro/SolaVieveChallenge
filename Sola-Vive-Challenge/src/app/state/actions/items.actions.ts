import { createAction, props } from '@ngrx/store';
import Feedback from 'src/app/interfaces/feedback.interface';

export const loadingFeedbacks = createAction(
  '[Feedback collection] Load feedback',
);
  
export const getFeedback = createAction(
    '[Feedback collection] Get collection success',
    props<{ collection: Feedback[];}>()
  );

export const faildToLoadFeedbacks = createAction(
    '[Feedback collection] Get collection faild',
  );

  