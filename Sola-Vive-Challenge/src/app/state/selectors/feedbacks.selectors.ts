import { createSelector } from "@ngrx/store";
import { FeedbackState } from "src/app/interfaces/feedback.state";
import { AppState } from "../app.state";

export const selectFeedbacksFeature = (state: AppState) => state.feedbackList;

export const selectFeedbacksList = createSelector(
    selectFeedbacksFeature,
    (state: FeedbackState) => state.feedbacks
)

export const selectFeedbacksLoading = createSelector(
    selectFeedbacksFeature,
    (state: FeedbackState) => state.loading
)

export const selectFeedbacksError = createSelector(
    selectFeedbacksFeature,
    (state: FeedbackState) => state.error
)