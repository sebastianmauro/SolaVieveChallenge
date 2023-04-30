import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { LoginComponent } from './app.component';
import { FeedbackService } from './services/feedback.service';
import { MatCardModule } from '@angular/material/card';
import { FiveStarsComponent } from './components/five-stars/five-stars.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOMER_SERVICE_RATE_TITLE, EXPERIENCE_RATE_TITLE, PAYMENT_RATE_TITLE } from './constants/sentences';
import { FeedbackSubject } from 'src/enums/feedbackSubject';
import { of } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let matDialogService: jasmine.SpyObj<MatDialog>;
  matDialogService = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
  let feedbackInjectedStub = {
    saveFeedback():(Promise<any>) {return new Promise(()=>{"moked Data"})} 
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, MockComponent(FiveStarsComponent) ],
      imports:[MatCardModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialog,
          useValue: matDialogService,
        },
        {
          provide: FeedbackService,
          useValue: feedbackInjectedStub,
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create correctly', () => {
    expect(component).toBeTruthy();
    expect(component.experienceRateText).toBe(EXPERIENCE_RATE_TITLE);
    expect(component.paymentRateText).toBe(PAYMENT_RATE_TITLE);
    expect(component.customerServiceRateText).toBe(CUSTOMER_SERVICE_RATE_TITLE);
  });

  it('experience rate sholud be set correctly', () => {
    const aRate = 5;
    component.setRateOf(aRate,FeedbackSubject.Experience);
    expect(component.experienceRate).toBe(aRate);
  });

  it('payment rate sholud be set correctly', () => {
    const aRate = 5;
    component.setRateOf(aRate,FeedbackSubject.Payments);
    expect(component.paymentRate).toBe(aRate);
  });

  it('customer service rate sholud be set correctly', () => {
    const aRate = 5;
    component.setRateOf(aRate,FeedbackSubject.CustomerService);
    expect(component.customerServiceRate).toBe(aRate);
  });

  /*it('if nothing goes wrong when sends openSuccesPopUp sholud be call', () => {
    spyOn(component, 'openSuccesPopUp');
    component.send();
    expect(component.openSuccesPopUp).toHaveBeenCalled();
  });*/

  /*it('if something goes wrong when sends openErrorOccurredPopUp sholud be call', () => {
    spyOn(component, 'openErrorOccurredPopUp');
    const xService = fixture.debugElement.injector.get(FeedbackService);
    const mockCall = spyOn(xService,'saveFeedback').and.callFake(()=> of("gg"));
    component.send();
    expect(component.openErrorOccurredPopUp).toHaveBeenCalled();
    mockCall.calls.reset();
  });*/
});
