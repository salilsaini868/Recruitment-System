import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, OnDestroy } from '@angular/core';

import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-hiringtrendchart',
  templateUrl: './chart.hiringtrend.component.html'
})

export class HiringTrendChartComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const options: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Candidate Hiring'
      },
      subtitle: {
        text: 'Source: RHPM.com'
      },
      xAxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Candidate Hired'
        }
      },
      credits: {
        text: 'Salil Saini'
      },
      exporting: {
        enabled: true
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
        name: 'Asp.Net',
        data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]

      }, {
        name: 'Angular',
        data: [83, 78, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]

      }, {
        name: 'Java',
        data: [48, 38, 39, 41, 47, 48, 59, 59, 52, 65, 59, 51]

      }, {
        name: 'IT',
        data: [42, 33, 34, 39, 52, 75, 57, 60, 47, 39, 46, 51]

      }]
    };
    this.chart = chart(this.chartTarget.nativeElement, options);
  }

  ngOnDestroy() {
    this.chart = null;
  }
}
