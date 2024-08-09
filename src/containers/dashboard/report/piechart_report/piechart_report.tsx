import { createEffect, type Component } from 'solid-js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Piechart_report: Component = () => {
    createEffect(() => {
        setTimeout(() => {
            chart_income()
        }, 500);
    })

    const chart_income = () => {
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("pieexpenses", am4charts.PieChart);

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = "jenis_pengeluaran";

        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = am4core.percent(55);
        chart.radius = am4core.percent(80);
        chart.logo.disabled = true;


        chart.data = [{
            "jenis_pengeluaran": "Lorem Ipsum",
            "total": 501.9
        }, {
            "jenis_pengeluaran": "Lorem Ipsum",
            "total": 165.8
        }, {
            "jenis_pengeluaran": "Lorem Ipsum",
            "total": 139.9
        }, {
            "jenis_pengeluaran": "Lorem Ipsum",
            "total": 128.3
        }, {
            "jenis_pengeluaran": "Lorem Ipsum",
            "total": 99
        }, {
            "jenis_pengeluaran": "Lorem Ipsum",
            "total": 60
        }];
        pieSeries.labels.template.disabled = true;

        // let label = chart.seriesContainer.createChild(am4core.Label);
        // label.text = "Total Biaya Total";
        // label.horizontalCenter = "middle";
        // label.verticalCenter = "middle";
        // label.fontSize = 16;

        // // Menghitung total liternya
        // let totaltotal = chart.data.reduce((acc, item) => acc + item.total, 0);

        // // Menambahkan persentase total ke dalam label
        // label.events.on("inited", (event) => {
        //     label.text += \n${Math.round((totaltotal / 1000) * 100)}%;
        //   });



        // Misalnya, definisikan categoryWithHighestValue sebagai objek awal
        let categoryWithHighestValue = chart.data[0];

        // Kemudian, hitung kategori dengan nilai terbesar
        categoryWithHighestValue = chart.data.reduce((maxCategory, currentItem) => {
            return currentItem.total > maxCategory.total ? currentItem : maxCategory;
        }, chart.data[0]); // Menggunakan data pertama sebagai nilai awal

        // Menghitung total liternya
        let totaltotal = chart.data.reduce((acc, item) => acc + item.total, 0);

        // Membuat label untuk persentase
        let percentageLabel = chart.seriesContainer.createChild(am4core.Label);
        percentageLabel.text = `${Math.round((categoryWithHighestValue.total / totaltotal) * 100)}%`;
        percentageLabel.horizontalCenter = "middle";
        percentageLabel.verticalCenter = "middle"; // Mengatur ke tengah label
        percentageLabel.fontSize = 24; // Ukuran font persentase lebih besar
        percentageLabel.fontWeight = "500";
        percentageLabel.y = -7;


        // Membuat label untuk keterangan
        let descriptionLabel = chart.seriesContainer.createChild(am4core.Label);
        descriptionLabel.text = categoryWithHighestValue.jenis_pengeluaran;
        descriptionLabel.horizontalCenter = "middle";
        descriptionLabel.verticalCenter = "middle"; // Mengatur ke tengah label
        descriptionLabel.fontSize = 12; // Ukuran font keterangan
        descriptionLabel.y = +10;


    }

    return (
        <div class="containers">
            <div id="pieexpenses" style={{ width: '250x', height: '250px' }}></div>
        </div>
    );
};

export default Piechart_report;