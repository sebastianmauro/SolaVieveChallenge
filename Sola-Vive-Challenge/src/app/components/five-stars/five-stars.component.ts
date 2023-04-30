import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RatingAttibutes } from 'src/enums/ratingAttributes';

@Component({
  selector: 'app-five-stars',
  templateUrl: './five-stars.component.html',
  styleUrls: ['./five-stars.component.css']
})
export class FiveStarsComponent {
  @Output() changeRate = new EventEmitter<number>();
  @Input() text:string = '';
  public rate: number = RatingAttibutes.RateBeginnigValue;
  public max: number = RatingAttibutes.MaxRateValue;
  public isReadonly = false;

  setRate(){
    this.changeRate.emit(this.rate)
  }
}
