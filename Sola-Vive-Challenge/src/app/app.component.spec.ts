import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { MainComponent } from './app.component';
import { FeedbackService } from './services/feedback.service';
import { MatCardModule } from '@angular/material/card';
import { FiveStarsComponent } from './components/five-stars/five-stars.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOMER_SERVICE_RATE_TITLE, EXPERIENCE_RATE_TITLE, GET_COLLECTION_ERROR_LOG, PAYMENT_RATE_TITLE } from './constants/sentences';
import { FeedbackSubject } from 'src/enums/feedbackSubject';
import { delay } from 'rxjs';

describe('AppComponent', () => {
  let appComponent: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let matDialogService: jasmine.SpyObj<MatDialog>;
  let feedbackServiceSpy: jasmine.SpyObj<FeedbackService>;
  feedbackServiceSpy = jasmine.createSpyObj('feedbackServiceSpy', ['saveFeedback', 'getFeedback']);
  matDialogService = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent, MockComponent(FiveStarsComponent) ],
      imports:[MatCardModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      providers: [
        MainComponent,
        {
          provide: MatDialog,
          useValue: matDialogService,
        },
        {
          provide: FeedbackService,
          useValue: feedbackServiceSpy,
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    feedbackServiceSpy.saveFeedback.calls.reset();
    feedbackServiceSpy.getFeedback.calls.reset();
  });

  it('should create correctly', () => {
    expect(appComponent).toBeTruthy();
    expect(appComponent.experienceRateText).toBe(EXPERIENCE_RATE_TITLE);
    expect(appComponent.paymentRateText).toBe(PAYMENT_RATE_TITLE);
    expect(appComponent.customerServiceRateText).toBe(CUSTOMER_SERVICE_RATE_TITLE);
  });

  it('experience rate sholud be set correctly', () => {
    const aRate = 5;
    appComponent.setRateOf(aRate,FeedbackSubject.Experience);
    expect(appComponent.experienceRate).toBe(aRate);
  });

  it('payment rate sholud be set correctly', () => {
    const aRate = 5;
    appComponent.setRateOf(aRate,FeedbackSubject.Payments);
    expect(appComponent.paymentRate).toBe(aRate);
  });

  it('customer service rate sholud be set correctly', () => {
    const aRate = 5;
    appComponent.setRateOf(aRate,FeedbackSubject.CustomerService);
    expect(appComponent.customerServiceRate).toBe(aRate);
  });

  it('if nothing goes wrong when sends openSuccesPopUp sholud be call', async () => {
    const spyOpenSuccesPopUp = spyOn(appComponent, 'openSuccesPopUp');
    const okResponsePromise = Promise.resolve('moked ok response');
    feedbackServiceSpy.saveFeedback.and.returnValue(okResponsePromise);
    await appComponent.send();
    expect(spyOpenSuccesPopUp).toHaveBeenCalled();
    spyOpenSuccesPopUp.calls.reset();
  });

  it('if something goes wrong when sends openErrorOccurredPopUp sholud be call', async () => {
    const appComponentSpy = spyOn(appComponent, 'openErrorOccurredPopUp');
    const aRejectedPromise = Promise.reject(new Error("mocked test error"));
    feedbackServiceSpy.saveFeedback.and.returnValue(aRejectedPromise);
    await appComponent.send();
    expect(appComponentSpy).toHaveBeenCalled();
    appComponentSpy.calls.reset();
  });

  it('when printOnConsole is call, it shoud call console.log', async () => {
    mockGetFeedbackwithOkPromise(feedbackServiceSpy);
    console.log = jasmine.createSpy("log");
    await appComponent.printOnConsole();
    expect(console.log).toHaveBeenCalled();
  });

  it('when printOnConsole is call, it shoud call getFeedback from the service', async () => {
    mockGetFeedbackwithOkPromise(feedbackServiceSpy);
    await appComponent.printOnConsole();
    expect(feedbackServiceSpy.getFeedback).toHaveBeenCalled();
  });

  it('when printOnConsole is call, it shoud print the service result', async () => {
    const responseContent = mockGetFeedbackwithOkPromise(feedbackServiceSpy);
    console.log = jasmine.createSpy("log");
    await appComponent.printOnConsole();
    expect(console.log).toHaveBeenCalledOnceWith(responseContent);
  });

  it('when printOnConsole is call but recives a rejected promise, it shoud print the error on console', async () => {
    const responseError = mockGetFeedbackWithRejectedPromise(feedbackServiceSpy);
    console.log = jasmine.createSpy("log");
    await appComponent.printOnConsole();
    expect(console.log).toHaveBeenCalledOnceWith(GET_COLLECTION_ERROR_LOG, responseError);
  });
});

function mockGetFeedbackwithOkPromise(feedbackServiceSpy: jasmine.SpyObj<FeedbackService>) {
  const responseContent = [{ id: "anId", experienceRate: 5, paymentProcessRate: 5, customerServiceRate: 5, comment: "aCommet" }];
  const okResponsePromise = Promise.resolve(responseContent);
  feedbackServiceSpy.getFeedback.and.returnValue(okResponsePromise);
  return responseContent;
}

function mockGetFeedbackWithRejectedPromise(feedbackServiceSpy: jasmine.SpyObj<FeedbackService>) {
  const errorMessage = "mocked test error";
  const responseError = new Error(errorMessage);
  const rejectedResponsePromise = Promise.reject(responseError);
  feedbackServiceSpy.getFeedback.and.returnValue(rejectedResponsePromise);
  return responseError;
}
