import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-five-stars',
  templateUrl: './five-stars.component.html',
  styleUrls: ['./five-stars.component.css']
})
export class FiveStarsComponent {
  @Input() max = 5;
  @Input() min = 0;
  public rate: number;
  public isReadonly = false;
  @Input() text = '';
  constructor() { 
    this.rate = this.min;
  }

}
