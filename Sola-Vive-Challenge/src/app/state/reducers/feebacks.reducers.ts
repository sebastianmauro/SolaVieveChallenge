import { Action, createReducer, on } from '@ngrx/store';
import { FeedbackState } from 'src/app/interfaces/feedback.state';
import { loadedFeedback, loadFeedback } from '../actions/items.actions';

export const initialState: FeedbackState = {loading: false, feedbacks: []}

export const feedbackReducer = createReducer(
    initialState,
    on(loadFeedback, (state)=>{
        return {...state, loading: true};
    }),

    on(loadedFeedback, (state, {addenFeedback})=>{
        return {...state, loading: false, feedbacks:[addenFeedback]};
    })
)