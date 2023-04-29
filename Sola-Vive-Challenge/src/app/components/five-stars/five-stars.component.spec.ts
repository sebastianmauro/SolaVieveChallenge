import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveStarsComponent } from './five-stars.component';

describe('FiveStarsComponent', () => {
  let component: FiveStarsComponent;
  let fixture: ComponentFixture<FiveStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
