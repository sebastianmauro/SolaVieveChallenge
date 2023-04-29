import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseCode } from '../../../enums/responseCodes';
import { popUpComponent } from './popUp.component';
import { NOT_OK_FIRST_SENTENCE, NOT_OK_SECOND_SENTENCE, OK_FIRST_SENTENCE, OK_SECOND_SENTECE } from '../../statics/sentences';
import { NOT_OK_IMG_SOURCE, OK_IMG_SOURCE } from '../../statics/imgSources';

describe('popUpComponent', () => {
  const ErrorData = {status: ResponseCode.InternalServerError};
  const Okdata = {status: ResponseCode.Success};
  let component: popUpComponent;
  let fixture: ComponentFixture<popUpComponent>;

  const dialogMock = {close: () => { }};

  it('create a ok popUp correctly', async () => {
    await createPopUp(Okdata);
    expect(component).toBeTruthy();
    expect(component.firstSentence).toBe(OK_FIRST_SENTENCE);
    expect(component.secondSentence).toBe(OK_SECOND_SENTECE);
    expect(component.imgSource).toBe(OK_IMG_SOURCE);
  });

  it('create a Error popUp correctly', async () => {
    await createPopUp(ErrorData);
    expect(component).toBeTruthy();
    expect(component.firstSentence).toBe(NOT_OK_FIRST_SENTENCE);
    expect(component.secondSentence).toBe(NOT_OK_SECOND_SENTENCE);
    expect(component.imgSource).toBe(NOT_OK_IMG_SOURCE);
  });

  it('popUp closeMe shold call dialogRef.close()', async () => {
    await createPopUp(ErrorData);
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.closeMe();
    expect(spy).toHaveBeenCalled(); 
  });

  async function createPopUp(data:any) {
    await TestBed.configureTestingModule({
      declarations: [ popUpComponent ],
      imports: [ MatDialogModule ],
      providers: [{provide: MatDialogRef, useValue: dialogMock},
      {provide: MAT_DIALOG_DATA, useValue: data}]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(popUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});

