import Feedback from "./feedback.interface";

export interface FeedbackState{
    loading: boolean,
    feedbacks: ReadonlyArray<Feedback>;
}