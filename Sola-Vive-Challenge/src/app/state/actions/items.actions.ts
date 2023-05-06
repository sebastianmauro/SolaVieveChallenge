import { createAction, props } from '@ngrx/store';
import Feedback from 'src/app/interfaces/feedback.interface';

export const loadFeedback = createAction(
  '[Feedback collection] Load feedback',
  //props<{ rating: number; rate: string }>()
);

export const loadedFeedback = createAction(
    '[Feedback collection] Loaded success',
    props<{ addenFeedback: Feedback;}>()
  );