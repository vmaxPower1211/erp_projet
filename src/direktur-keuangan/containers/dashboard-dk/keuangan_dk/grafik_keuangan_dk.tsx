import { createEffect, onCleanup, createSignal, Component, onMount } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Icon } from '@iconify-icon/solid';

const Grafik_keuangan_dk: Component = () => {

    createEffect(() => {
        let chart: am4charts.XYChart | null = null;

        // Callback untuk menggambar chart
        const drawChart = () => {
            am4core.useTheme(am4themes_animated);
            chart = am4core.create("chart_keuangan", am4charts.XYChart);
            chart.width = am4core.percent(100);
            chart.height = 400;
            chart.logo.disabled = true;

            // let data = GrafikKeuanganData();
            // chart.data = data;

            // Add data
            chart.data = [{
                "Bulan": "Jan",
                "profitloss": 200,
                "journal": 400,
                "balance": 300
            }, {
                "Bulan": "Feb",
                "profitloss": 300,
                "journal": 500,
                "balance": 200
            }, {
                "Bulan": "Mar",
                "profitloss": 600,
                "journal": 300,
                "balance": 200
            }, {
                "Bulan": "Apr",
                "profitloss": 400,
                "journal": 100,
                "balance": 100
            }, {
                "Bulan": "Mei",
                "profitloss": 500,
                "journal": 200,
                "balance": 200
            }, {
                "Bulan": "Jun",
                "profitloss": 200,
                "journal": 300,
                "balance": 300
            }];

            // Create category axis
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Bulan";

            // Create value axis
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 100; // Set minimum value
            valueAxis.max = 1000; // Set maximum value
            valueAxis.strictMinMax = true;
            valueAxis.renderer.minGridDistance = 20;

            // Line series 1 (profitloss)
            let lineSeries1 = chart.series.push(new am4charts.LineSeries());
            lineSeries1.dataFields.valueY = "profitloss";
            lineSeries1.dataFields.categoryX = "Bulan";
            lineSeries1.name = "profitloss";
            lineSeries1.stroke = am4core.color("#165BAA");
            lineSeries1.strokeWidth = 3;

            // Add simple bullet for line series 1 (profitloss)
            let bullet1 = lineSeries1.bullets.push(new am4charts.CircleBullet());
            bullet1.circle.radius = 5;
            bullet1.circle.fill = am4core.color("#165BAA");

            // Line series 2 (journal)
            let lineSeries2 = chart.series.push(new am4charts.LineSeries());
            lineSeries2.dataFields.valueY = "journal";
            lineSeries2.dataFields.categoryX = "Bulan";
            lineSeries2.name = "Journal";
            lineSeries2.stroke = am4core.color("#A155B9");
            lineSeries2.strokeWidth = 3;

            // Add simple bullet for line series 2 (journal)
            let bullet2 = lineSeries2.bullets.push(new am4charts.CircleBullet());
            bullet2.circle.radius = 5;
            bullet2.circle.fill = am4core.color("#A155B9");

            // Line series 3 (balance)
            let lineSeries3 = chart.series.push(new am4charts.LineSeries());
            lineSeries3.dataFields.valueY = "balance";
            lineSeries3.dataFields.categoryX = "Bulan";
            lineSeries3.name = "Balance";
            lineSeries3.stroke = am4core.color("#F765A3");
            lineSeries3.strokeWidth = 3;

            // Add simple bullet for line series 3 (balance)
            let bullet3 = lineSeries3.bullets.push(new am4charts.CircleBullet());
            bullet3.circle.radius = 5;
            bullet3.circle.fill = am4core.color("#F765A3");

            chart.cursor = new am4charts.XYCursor();
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
            <div class="grafik-keuangan-container" style={{ "background-color": "#FFFFFFEB", "margin-top": "10px", "border-radius": "6px", "height": "62vh" }}>
                <div id="chart_keuangan" style={{ "width": "60vw", "height": "90vw", "font-size": "14px" }}>
                </div>
            </div>




        </div>
    );
};

export default Grafik_keuangan_dk;
