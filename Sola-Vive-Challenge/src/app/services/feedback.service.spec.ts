import { TestBed } from '@angular/core/testing';
import { FeedbackService } from './feedback.service';
import { Firestore } from '@angular/fire/firestore';

describe('LoginComponent', () => {
  let feedbackService: FeedbackService;
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Firestore', ['']);

    await TestBed.configureTestingModule({
      providers: [FeedbackService,
        { provide: Firestore, useValue: spy },
      ],
    })
    .compileComponents();
    feedbackService = TestBed.inject(FeedbackService);
  });

  it('should create correctly', () => {
    expect(feedbackService).toBeTruthy();
  });
});
