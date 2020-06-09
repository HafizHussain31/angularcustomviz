import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as D3 from 'd3';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-tab2chart',
  templateUrl: './tab2chart.component.html',
  styleUrls: ['./tab2chart.component.css']
})
export class Tab2chartComponent implements OnInit {

  @Input() selectedCharts: string;

  serieColors = { 'Chart A': 'rgb(68,114,196)', 'Chart B': 'rgb(237,125,49)', 'Chart C': 'rgb(165,165,165)', 'Chart D': 'rgb(255,192,0)', 'Chart H': '#743979' };
  public options: any = {
  }

  constructor() { }
  ngOnChanges(changes) {
    this.childFunction()
  }
  public childFunction() {
    D3.csv('./assets/Tab2.csv').then(data => {
      let selectedCharts = this.selectedCharts.split(',');
      // let selectedCharts = this.selectedCharts.map(d => d.value);
      let filteredData = data.filter(function (d) {
        let i = 0;
        let s = 0;
        while (i < selectedCharts.length) {
          let tmp = d[selectedCharts[i]] == '' || d[selectedCharts[i]] == undefined ? 0 : 1;
          s = s || tmp;
          i++;
        }
        return s;
      })

      let seriesData = [];
      selectedCharts.forEach((chart) => {
        let tmp = {}, tmpMarker = {};
        tmpMarker['fillColor'] = "transparent";
        tmp['marker'] = tmpMarker;
        tmp['data'] = filteredData.map((d) => d[chart] ? parseFloat(d[chart]) : NaN);
        tmp['name'] = chart;
        tmp['color'] = this.serieColors[chart];
        seriesData.push(tmp);
      })

      this.options = {
        title: {
          text: 'Monthly Average Temperature',
          x: -20 //center
        },
        subtitle: {
          text: 'Source: WorldClimate.com',
          x: -20
        },
        xAxis: {
          categories: filteredData.map(d => d['Date Time'])
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          valueSuffix: '°C'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0,
          showInLegend: false,
          // labelFormat: '{data]'
        },
        series: seriesData
      }
      Highcharts.chart('container', this.options);
    })
  }

  ngOnInit() {

  }
}
