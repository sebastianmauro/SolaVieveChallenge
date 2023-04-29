import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import { FiveStarsComponent } from './five-stars.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { RatingAttibutes } from 'src/enums/ratingAttributes';

describe('FiveStarsComponent', () => {
  let component: FiveStarsComponent;
  let fixture: ComponentFixture<FiveStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule, RatingModule, FormsModule ],
      declarations: [ FiveStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created correctly ', () => {
    expect(component).toBeTruthy();
    expect(component.max).toBe(RatingAttibutes.MaxRateValue);
    expect(component.rate).toBe(RatingAttibutes.RateBeginnigValue);
    expect(component.text).toBe('');
    expect(component.isReadonly).toBe(false);
  });

  it('should emit when setRate() is called', () => {
    spyOn(component.changeRate, 'emit');
    const aRatingValue = 5;
    component.rate = aRatingValue;
    component.setRate();
    expect(component.changeRate.emit).toHaveBeenCalledWith(aRatingValue);
  });
});
