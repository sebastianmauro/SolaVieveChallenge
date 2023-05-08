import { Action, createReducer, on } from '@ngrx/store';
import { FeedbackState } from 'src/app/interfaces/feedback.state';
import {getFeedback , loadingFeedbacks, faildToLoadFeedbacks } from '../actions/items.actions';

export const initialState: FeedbackState = {loading: false, feedbacks: [], error: false}

export const feedbackReducer = createReducer(
    initialState,
    on(loadingFeedbacks, (state)=>{
        return {...state, loading: true};
    }),

    on(getFeedback, (state, {collection})=>{
        return {...state, loading: false, feedbacks: collection};
    }),
    
    on(faildToLoadFeedbacks, (state)=>{
        return {...state, loading: false, error: true};
    })
)