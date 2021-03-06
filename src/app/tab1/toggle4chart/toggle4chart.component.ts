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
  selector: 'app-toggle4chart',
  templateUrl: './toggle4chart.component.html',
  styleUrls: ['./toggle4chart.component.css']
})
export class Toggle4chartComponent implements OnInit {
  public options: any = {
  }
  constructor() { }

  ngOnInit(): void {
    D3.csv('./assets/Toggle4.csv').then(data => {
      var table = D3.select('#toggle4chart').append('table')
      var thead = table.append('thead')
      var tbody = table.append('tbody')

      thead.append('tr')
        .selectAll('th')
        .data(data.columns)
        .enter()
        .append('th')
        .text(function (d) { return d })

      var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

      var cells = rows.selectAll('td')
        .data(function (row) {
          return data.columns.map(function (column) {
            return { column: column, value: row[column] }
          })
        })
        .enter()
        .append('td')
        .text(function (d) { return d.value })
    });
  }

}