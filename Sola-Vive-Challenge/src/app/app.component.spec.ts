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
import { CUSTOMER_SERVICE_RATE_TITLE, EXPERIENCE_RATE_TITLE, PAYMENT_RATE_TITLE } from './constants/sentences';
import { FeedbackSubject } from 'src/enums/feedbackSubject';

describe('LoginComponent', () => {
  let appComponent: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let matDialogService: jasmine.SpyObj<MatDialog>;
  let feedbackServiceSpy: jasmine.SpyObj<FeedbackService>;
  feedbackServiceSpy = jasmine.createSpyObj('feedbackServiceSpy', ['saveFeedback']);
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
    const spy = spyOn(appComponent, 'openSuccesPopUp');
    const p1 = Promise.resolve('moked ok response');
    feedbackServiceSpy.saveFeedback.and.returnValue(p1);
    await appComponent.send();
    expect(spy).toHaveBeenCalled();
    spy.calls.reset();
  });

  it('if something goes wrong when sends openErrorOccurredPopUp sholud be call', async () => {
    const appComponentSpy = spyOn(appComponent, 'openErrorOccurredPopUp');
    const aRejectedPromise = Promise.reject(new Error("mocked test error"));
    feedbackServiceSpy.saveFeedback.and.returnValue(aRejectedPromise);
    await appComponent.send();
    expect(appComponentSpy).toHaveBeenCalled();
    appComponentSpy.calls.reset();
  });
});
