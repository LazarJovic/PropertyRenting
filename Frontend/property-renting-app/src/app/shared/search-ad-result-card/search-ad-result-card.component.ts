import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchAdResult } from '@core/model/search-ad-result';

@Component({
  selector: 'app-search-ad-result-card',
  templateUrl: './search-ad-result-card.component.html',
  styleUrls: ['./search-ad-result-card.component.css']
})
export class SearchAdResultCardComponent implements OnInit {

  propertyImage: any;
  startDate: string;
  endDate: string;

  @Input()
  item: SearchAdResult;

  @Output() detailsEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  details() {

  }

}
