import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
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
  selector: 'app-tab1chart',
  templateUrl: './tab1chart.component.html',
  styleUrls: ['./tab1chart.component.css']
})
export class Tab1chartComponent implements OnInit, OnDestroy {

  @Input() chart: string;
  chartid: string;

  serieColors = { 'Chart A': 'rgb(68,114,196)', 'Chart B': 'rgb(237,125,49)', 'Chart C': 'rgb(165,165,165)', 'Chart D': 'rgb(255,192,0)', 'Chart H': '#743979' };
  public options: any = {
  }

  constructor() {

  }

  ngOnChanges(changes) {

    this.childFunction()
  }
  public childFunction() {

  }

  ngOnDestroy() {

  }
  ngOnInit() {
    let chartStr: string = this.chart;
    console.log(chartStr);
    this.chartid = chartStr.replace(/\s/g, "");
    D3.csv('./assets/Tab1.csv').then(data => {
      let selectedChart = this.chart;
      // let selectedCharts = this.selectedCharts.map(d => d.value);
      let filteredData = data.filter(function (d) {
        return d['Chart Type'] == selectedChart
      })

      let seriesData = [];
      filteredData.forEach(function (d) {
        let tmp = [];
        tmp[0] = new Date(d['Date'] + ' ' + d['Time']).getTime();
        tmp[1] = parseFloat(d['Value']);
        seriesData.push(tmp);
      })
      // selectedCharts.forEach((chart) => {
      //   let tmp = {}, tmpMarker = {};
      //   tmpMarker['fillColor'] = "transparent";
      //   tmp['marker'] = tmpMarker;
      //   tmp['data'] = filteredData.map((d) => d[chart] ? parseFloat(d[chart]) : NaN);
      //   tmp['name'] = chart;
      //   tmp['color'] = this.serieColors[chart];
      //   seriesData.push(tmp);
      // })

      this.options = {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'USD to EUR exchange rate over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Exchange rate'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },

        series: [{
          type: 'area',
          name: 'USD to EUR',
          data: seriesData
        }]
      }

      let chartContainerId = 'tab1-' + this.chartid;
      Highcharts.chart(chartContainerId, this.options);
    })
  }
}
