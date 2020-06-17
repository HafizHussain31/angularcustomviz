import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
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
    if (chartStr != "Special") {
      this.chartid = chartStr.replace(/\s/g, "");
      D3.csv('./assets/Tab1.csv').then(data => {
        D3.csv('./assets/Tab1Range.csv').then(rangeData => {
          let selectedChart = this.chart;
          // let selectedCharts = this.selectedCharts.map(d => d.value);
          let filteredData = data.filter(function (d) {
            return d['Chart Type'] == selectedChart
          })
          let filteredRange = rangeData.filter(d => d['Replacement '] == selectedChart);
          let seriesData = [];
          filteredData.forEach(function (d) {
            let tmp = [];
            tmp[0] = new Date(d['Date'] + ' ' + d['Time']).getTime();
            tmp[1] = parseFloat(d['Value']);
            seriesData.push(tmp);
          })

          let greenRangeData = [];
          let tmp1 = [];
          tmp1[0] = seriesData[0][0];
          tmp1[1] = parseFloat(filteredRange[0]['Min Yellow']);
          tmp1[2] = parseFloat(filteredRange[0]['Max Yellow']);
          greenRangeData.push(tmp1);
          tmp1 = [];
          tmp1[0] = seriesData[seriesData.length - 1][0];
          tmp1[1] = parseFloat(filteredRange[0]['Min Yellow']);
          tmp1[2] = parseFloat(filteredRange[0]['Max Yellow']);
          greenRangeData.push(tmp1);

          let yellowRangeData = [];
          tmp1 = [];
          tmp1[0] = seriesData[0][0];
          tmp1[1] = parseFloat(filteredRange[0]['Min Green']);
          tmp1[2] = parseFloat(filteredRange[0]['Max G']);
          yellowRangeData.push(tmp1);
          tmp1 = [];
          tmp1[0] = seriesData[seriesData.length - 1][0];
          tmp1[1] = parseFloat(filteredRange[0]['Min Green']);
          tmp1[2] = parseFloat(filteredRange[0]['Max G']);
          yellowRangeData.push(tmp1);

          this.options = {
            chart: {
              zoomType: 'x',
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
              series: {
                marker: {
                  enabled: false
                }
              }
            },

            series: [
              {
                type: 'arearange',
                name: 'USD to EUR',
                data: greenRangeData
              }, {
                type: 'arearange',
                name: 'USD to EUR',
                data: yellowRangeData
              }, {
                type: 'line',
                name: 'USD to EUR',
                data: seriesData
              }]
          }

          let chartContainerId = 'tab1-' + this.chartid;
          Highcharts.chart(chartContainerId, this.options);
        })
      })
    } else {
      this.chartid = chartStr.replace(/\s/g, "");
      D3.csv('./assets/Tab1Special.csv').then(data => {
        let selectedChart = this.chart;
        this.options = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Percent'
          },
          xAxis: {
            categories: data.map((d) => d['Bar']),
            crosshair: true
          },
          legend: {
            enabled: false
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Percent'
            }
          },
          tooltip: {
            headerFormat: '<table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            data: data.map((d) => parseInt(d['Percent']))
          }]
        };
        let chartContainerId = 'tab1-' + this.chartid;
        Highcharts.chart(chartContainerId, this.options);
      })
    }

  }
}
