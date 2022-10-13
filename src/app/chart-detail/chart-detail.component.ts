import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { DataChart } from '../models/data-chart.model';
import { OptionsChart } from '../models/enum-options-char.model';
import { LuminariaInMap } from '../models/luminariaInMap.model';
import { LuminariesService } from '../services/luminaries.service';

@Component({
  selector: 'app-chart-detail',
  templateUrl: './chart-detail.component.html',
  styleUrls: ['./chart-detail.component.css'],
})
export class ChartDetailComponent implements OnInit {
  Highcharts = Highcharts;
  pieChartOptions: any;
  listLuminariesMap: LuminariaInMap[] = [];
  public selectedType: string = 'tipo_luminaria';
  listDataChart: DataChart[] = [];
  dataToUseInChart: (string | number | undefined)[][] = [];
  optionsChart = OptionsChart;

  constructor(public luminariesService: LuminariesService) {}

  ngOnInit(): void {
    this.chargeChartInfo();
    this.createPieChart();
  }

  valueDataChange(event: any) {
    this.selectedType = event;
    this.chargeChartInfo();
    this.createPieChart();
  }

  chargeChartInfo() {
    this.listDataChart = [];
    this.dataToUseInChart = [];
    this.listLuminariesMap = this.luminariesService.getLuminariesInMap();

    if (this.listLuminariesMap && this.listLuminariesMap.length > 0) {
      this.listLuminariesMap.forEach((luminary) => {
        let founded = this.listDataChart.find(
          (dc) =>
            dc.nombre == luminary[this.selectedType as keyof typeof luminary]
        );
        if (founded) {
          this.listDataChart.forEach((dataChartInList) => {
            if (
              dataChartInList.nombre ==
              luminary[this.selectedType as keyof typeof luminary]
            ) {
              if (dataChartInList.cantidad || dataChartInList.cantidad == 0) {
                dataChartInList.cantidad++;
              }
            }
          });
        } else {
          let dataChart = new DataChart();
          dataChart.nombre =
            luminary[this.selectedType as keyof typeof luminary];
          dataChart.cantidad = 1;
          this.listDataChart.push(dataChart);
        }
      });
      this.listDataChart.forEach((lDataChart) => {
        this.dataToUseInChart.push([lDataChart.nombre, lDataChart.cantidad]);
      });
    }
  }

  createPieChart() {
    this.pieChartOptions = {
      chart: {
        renderTo: 'container',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        text:
          this.selectedType.substring(0, 1).toLocaleUpperCase() +
          this.selectedType.replace('_', ' ').substring(1),
      },
      subtitle: {
        text: 'N° total luminarias ' + this.listLuminariesMap.length,
      },
      tooltip: {
        pointFormat: '<b>{point.percentage}%</b>',
        percentageDecimals: 1,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            color: '#000000',
            connectorColor: '#000000',
            format: '<b>{point.name}</b>:<br>{point.percentage}%',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: '',
          data: this.dataToUseInChart,
        },
      ],
    };
  }
}
