import { createEffect, onCleanup, createSignal, Component } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Icon } from '@iconify-icon/solid';

const Barchart_inex_report: Component = () => {
    createEffect(() => {
        let chart: am4charts.XYChart | null = null;

        // Callback untuk menggambar chart
        const drawChart = () => {
            am4core.useTheme(am4themes_animated);
            chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.width = am4core.percent(100);
            chart.height = 400;
            chart.logo.disabled = true;

            // Data
            chart.data = [
                {
                    "month": "01/22",
                    "Pemasukan": 50,
                    "Pengeluaran": 56
                },
                {
                    "month": "02/22",
                    "Pemasukan": 40,
                    "Pengeluaran": 38
                },
                {
                    "month": "03/22",
                    "Pemasukan": 50,
                    "Pengeluaran": 40
                },
                {
                    "month": "04/22",
                    "Pemasukan": 35,
                    "Pengeluaran": 33
                },
                {
                    "month": "05/22",
                    "Pemasukan": 25,
                    "Pengeluaran": 23
                },
                {
                    "month": "06/22",
                    "Pemasukan": 35,
                    "Pengeluaran": 50
                },
                {
                    "month": "07/22",
                    "Pemasukan": 13,
                    "Pengeluaran": 9
                },
                {
                    "month": "08/22",
                    "Pemasukan": 25,
                    "Pengeluaran": 18
                },
                {
                    "month": "09/22",
                    "Pemasukan": 40,
                    "Pengeluaran": 35
                }
            ];

            // Axis X (CategoryAxis)
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "month";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;
            categoryAxis.renderer.cellStartLocation = 0.1;
            categoryAxis.renderer.cellEndLocation = 0.9;

            // Axis Y (ValueAxis)
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.max = 200;

            // Create series
            function createSeries(field: string, name: string, stacked: boolean, color: any) {
                let series = chart!.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = field;
                series.dataFields.categoryX = "month";
                series.name = name;
                series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
                series.stacked = stacked;
                series.columns.template.width = am4core.percent(100);
                series.columns.template.fill = color;
                series.columns.template.column.cornerRadiusTopLeft = 999; // Atur radius sudut kiri atas
                series.columns.template.column.cornerRadiusTopRight = 999;

                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 20;
                categoryAxis.renderer.cellStartLocation = 0.3;
                categoryAxis.renderer.cellEndLocation = 0.7;
            }

            createSeries("Pemasukan", "Pemasukan", false, am4core.color("#6E49E9"));
            createSeries("Pengeluaran", "Pengeluaran", false, am4core.color("#8A8A8B"));

            // Add legend
            chart!.legend = new am4charts.Legend();
            chart.legend.position = "top";
            let markerTemplate = chart.legend.markers.template;
            markerTemplate.width = 19;
            markerTemplate.height = 5;
        };

        // Gambar chart ketika komponen pertama kali dimount
        drawChart();

        // Cleanup untuk menghancurkan chart saat komponen di-unmount
        onCleanup(() => {
            if (chart) {
                chart.dispose();
            }
        });

        return () => {
            // Hapus chart sebelum menggambar yang baru
            if (chart) {
                chart.dispose();
            }
        };
    });

    return (
        <div>
            <div class="barchart1-container" style={{ "background-color": "#FFFFFFEB", "margin-top": "10px", "border-radius": "6px", "height": "62vh", "margin-left": "20px", "width": "142vh" }}>
                <div id="chartdiv" style={{ "width": "142vh", "height": "90vw", "font-size": "14px" }}>
                </div>
            </div>
        </div>
    );
};

export default Barchart_inex_report;
