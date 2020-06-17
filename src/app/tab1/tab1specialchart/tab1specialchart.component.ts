import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as D3 from 'd3';
import { EventEmitter } from 'events';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-tab1specialchart',
  templateUrl: './tab1specialchart.component.html',
  styleUrls: ['./tab1specialchart.component.css']
})
export class Tab1specialchartComponent implements OnInit {
  @Input() chart: string;
  chartid: string;
  public options: any = {
  }
  constructor() { }

  ngOnInit(): void {
    let chartStr: string = this.chart;
    console.log(chartStr);
    this.chartid = chartStr.replace(/\s/g, "");

  }
}
