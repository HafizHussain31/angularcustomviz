import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ganttChart } from 'highcharts/highcharts-gantt';
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
  selector: 'app-toggle2chart',
  templateUrl: './toggle2chart.component.html',
  styleUrls: ['./toggle2chart.component.css']
})
export class Toggle2chartComponent implements OnInit {
  public options: any = {
  }
  constructor() { }

  ngOnInit(): void {
    var
      map = Highcharts.map,
      series,
      states = [];

    D3.csv('./assets/Toggle2.csv').then(data => {
      let groupedData = D3.nest()
        .key(function (d) { return d.Category; })
        .entries(data);
      groupedData.forEach((element) => {
        let tmp = [];
        tmp['model'] = element['key'];
        tmp['deals'] = [];
        element.values.forEach(el => {
          let tmpDate = new Date(el['Start Date'] + ' ' + el['Start Time']);
          let startstamp = tmpDate.getTime();
          let tmpdeal = [];
          tmpdeal['from'] = startstamp;
          let endDate = new Date(el['End Date'] + ' ' + el['End Time']);
          let endstamp = endDate.getTime();
          tmpdeal['to'] = endstamp;
          tmp['deals'].push(tmpdeal);
        });
        states.push(tmp);
      });

      series = states.map(function (car, i) {
        var data = car.deals.map(function (deal) {
          return {
            id: 'deal-' + i,
            rentedTo: deal.rentedTo,
            start: deal.from,
            end: deal.to,
            y: i
          };
        });
        return {
          name: car.model,
          data: data
          // current: car.deals[car.current]
        };
      });

      ganttChart('toggle2chart', {
        series: series,
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '<span>{point.rentedTo}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>'
        },
        xAxis: {
          currentDateIndicator: true
        },
        chart: {
          zoomType: 'x'
        },
        yAxis: {
          type: 'category',
          grid: {
            columns: [{
              title: {
                text: 'Model'
              },
              categories: map(series, function (s) {
                return s.name;
              })
            }]
          }
        }
      });

    });
  }

}