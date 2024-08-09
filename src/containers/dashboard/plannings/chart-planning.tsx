import { Component, createEffect, createSignal, onMount } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { dataplanning } from '../../../api/planning/dataplanning';
import { data_detailplanning } from '../../../api/planning/data-detailplanning';

const ChartPlanning: Component = () => {

  const [RowData, setRowData] = createSignal([{}]);

  onMount(async () => {
    const data_planning = await data_detailplanning("data detail plan");
    console.log("data detail plan", data_planning);
    setRowData(data_planning)
  })
       
    createEffect(()=> {
        setTimeout(() => {
          chartxy()
        }, 500);
      })

    const chartxy = () => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("planchart", am4charts.XYChart);

      chart.logo.disabled = true;

      let data1 = RowData();
        
      // chart.data = data;
      chart.data = data1;

          // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minGridDistance = 50;

      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "number_planning";
      series.dataFields.dateX = "date";
      series.stroke = am4core.color("#5327AE");
      series.strokeWidth = 2;
      series.fill = am4core.color("#5327AE");
      series.fillOpacity = 1;

      chart.legend = new am4charts.Legend();
      let markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 25;
      markerTemplate.height = 3;
      chart.legend.labels.template.text = "Permintaan";

      // Warna fill

      // dateAxis.dateFormats.setKey("day", "dd/M/yy");
      // dateAxis.dateFormats.setKey("week", "dd/M/yy");
      // dateAxis.dateFormats.setKey("month", "dd/M/yy");
      // dateAxis.dateFormats.setKey("year", "dd/M/yy");

      let fillModifier = new am4core.LinearGradientModifier();
      fillModifier.opacities = [1, 0];
      fillModifier.offsets = [0, 1];
      fillModifier.gradient.rotation = 90;
      series.segments.template.fillModifier = fillModifier;
      
      chart.cursor = new am4charts.XYCursor();
      // chart.cursor.behavior = "panXY"; 
      // chart.mouseWheelBehavior = "zoomXY";
      // dateAxis.maxZoomFactor = 10; 
    }

    return (
        <div>
          <div>
            <div id="planchart" style={{width: '75vh', height:'45vh', "margin-right":"10px"}}></div>
          </div>
        </div>
    )
}

export default ChartPlanning;