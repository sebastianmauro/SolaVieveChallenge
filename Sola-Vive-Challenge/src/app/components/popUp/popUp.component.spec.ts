import { ComponentFixture, TestBed } from '@angular/core/testing';

import { popUpComponent } from './popUp.component';

describe('popUpComponent', () => {
  let component: popUpComponent;
  let fixture: ComponentFixture<popUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ popUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(popUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
