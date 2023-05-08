import { ActionReducerMap } from "@ngrx/store";
import { FeedbackState } from "../interfaces/feedback.state";
import { feedbackReducer } from "./reducers/feebacks.reducers";

export interface AppState {
    feedbackList: FeedbackState;
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    feedbackList: feedbackReducer
}