import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChooseProperty } from '@core/model/choose-property';

@Component({
  selector: 'app-choose-property-card',
  templateUrl: './choose-property-card.component.html',
  styleUrls: ['./choose-property-card.component.css']
})
export class ChoosePropertyCardComponent implements OnInit {

  propertyImage: any;

  @Input()
  item: ChooseProperty;

  @Output() propertyChosen = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.propertyImage = 'data:image/jpeg;base64,' + this.item.image.picByte;
  }

  chooseProperty() {
    this.propertyChosen.emit(this.item);
  }

}
