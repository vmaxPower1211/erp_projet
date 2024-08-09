import { createEffect, onCleanup, createSignal, Component } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Barchart_labarugi_report: Component = () => {
    createEffect(() => {
        let chart: am4charts.XYChart | null = null;

        // Callback untuk menggambar chart
        const drawChart3 = () => {
            am4core.useTheme(am4themes_animated);

            chart = am4core.create("chartdiv3", am4charts.XYChart);
            chart.width = am4core.percent(100);
            chart.height = 400;
            chart.logo.disabled = true;

            // Data
            chart.data = [
                {
                    "month": "01/22",
                    "Total_Kas_Masuk": 90,
                    "Total_Kas_Keluar": 40
                },
                {
                    "month": "02/22",
                    "Total_Kas_Masuk": 60,
                    "Total_Kas_Keluar": 35
                },
                {
                    "month": "03/22",
                    "Total_Kas_Masuk": 70,
                    "Total_Kas_Keluar": 20
                },
                {
                    "month": "04/22",
                    "Total_Kas_Masuk": 90,
                    "Total_Kas_Keluar": 50
                },
                {
                    "month": "05/22",
                    "Total_Kas_Masuk": 100,
                    "Total_Kas_Keluar": 60
                },
                {
                    "month": "06/22",
                    "Total_Kas_Masuk": 50,
                    "Total_Kas_Keluar": 30
                },
                {
                    "month": "07/22",
                    "Total_Kas_Masuk": 65,
                    "Total_Kas_Keluar": 30
                },
                {
                    "month": "08/22",
                    "Total_Kas_Masuk": 30,
                    "Total_Kas_Keluar": 18
                },
                {
                    "month": "09/22",
                    "Total_Kas_Masuk": 50,
                    "Total_Kas_Keluar": 35
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
                series.columns.template.width = am4core.percent(95);
                series.columns.template.fill = color;
                series.columns.template.column.cornerRadiusTopLeft = 999; // Atur radius sudut kiri atas
                series.columns.template.column.cornerRadiusTopRight = 999;

                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 20;
                categoryAxis.renderer.cellStartLocation = 0.4;
                categoryAxis.renderer.cellEndLocation = 0.6;
            }

            createSeries("Total_Kas_Masuk", "Total Kas Masuk", false, am4core.color("#6E49E9"));
            createSeries("Total_Kas_Keluar", "Total Kas Keluar", false, am4core.color("#8A8A8B"));

            // Membuat LineSeries untuk "Perpindahan Kas Bersih"
            let lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.dataFields.valueY = "PerpindahanKasBersih";
            lineSeries.dataFields.categoryX = "month";
            lineSeries.name = "Perpindahan Kas Bersih";
            lineSeries.strokeWidth = 2;
            lineSeries.stroke = am4core.color("#000000");

            let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
            bullet.circle.fill = am4core.color("#000000"); // Warna bullet
            bullet.circle.stroke = am4core.color("#000000"); // Warna pinggiran bullet
            bullet.circle.strokeWidth = 2; // Lebar pinggiran bullet
            bullet.tooltipText = "{name}: [bold]{valueY}[/]";

            for (let i = 0; i < chart.data.length; i++) {
                let dataItem = chart.data[i];
                dataItem.PerpindahanKasBersih = dataItem.Total_Kas_Masuk - dataItem.Total_Kas_Keluar;
            }


            // Add legend
            chart!.legend = new am4charts.Legend();
            chart.legend.position = "top";
            let markerTemplate = chart.legend.markers.template;
            markerTemplate.width = 19;
            markerTemplate.height = 5;
        };

        // Gambar chart ketika komponen pertama kali dimount
        drawChart3();

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
            <div class="barchart2-container" style={{ "background-color": "#FFFFFFEB", "margin-top": "10px", "border-radius": "6px", "height": "62vh", "margin-left": "20px", "width": "142vh" }}>
                <div id="chartdiv3" style={{ "width": "142vh", "height": "90vw", "font-size": "14px" }}></div>
            </div>

        </div>
    );
};

export default Barchart_labarugi_report;
