import { Component, createSignal, onMount } from 'solid-js';
import Table_income_report from './table_report/table_income_report';
import Table_expenses_report from './table_report/table_expenses_report';
import Piechart_report from './piechart_report/piechart_report';
import Barchart_inex_report from './barchart_inex_report/barchart_inex_report';
import Barchart_aruskas_report from './barchart_aruskas_report/barchart_aruskas_report';
import Barchart_labarugi_report from './barchart_labarugi_report/barchart_labarugi_report';
// import ReportNavbar from '../reportNavbar';
import { Icon } from '@iconify-icon/solid';
import './report.css';
import Header from '../../header/header';
import { useNavbarStore } from '../../../store/Navbar/NavbarStore';
import { useSubNavbarStore } from '../../../store/Navbar/SubNavbarStore';
import { A } from '@solidjs/router';
import Grafik_keuangan_dashboard from '../accounting/grafik_keuangan_dashboard';


const Report: Component = () => {

    const [, {changeTitleNavbar}] = useNavbarStore();

    onMount(() => {
        changeTitleNavbar("Dashboard");
    })


    const [, {changeSubTitleNavbar} ] = useSubNavbarStore();

    onMount(() => {
        changeSubTitleNavbar("Report");
    }) 

    const [showIncomeTable, setShowIncomeTable] = createSignal(false);
    const [showExpensesTable, setShowExpensesTable] = createSignal(false);

    const toggleIncomeTable = () => {
        setShowIncomeTable(!showIncomeTable());
        setShowExpensesTable(false); // Pastikan tabel Expenses disembunyikan saat menampilkan tabel Income
    };

    const toggleExpensesTable = () => {
        setShowExpensesTable(!showExpensesTable());
        setShowIncomeTable(false); // Pastikan tabel Income disembunyikan saat menampilkan tabel Expenses
    };


    return (
        <div>
            <Header />
            {/* <div class="navbar-f-report">
                <ReportNavbar />
            </div> */}

            <div class="report-container" style={{ "background-color": "#EFEFEF", "height": "400vh", "width": "150vh", "border-radius": "10px", "padding-top": "15px", "margin-bottom": "20px" }}>
                {/* <div class="card-module">
                    <div style={{ "font-family":"Exo","font-size": "20px", "font-weight": "600", "margin-top": "2vh", "margin-left": "2vw" }}>
                        Report
                    </div>
                </div> */}
                <div class="report-container" style={{ "background-color": "#EFEFEF", "height": "290vh", "width": "150vh", "border-radius": "10px", "padding-top": "15px", "margin-bottom": "20px" }}>

                    {/* div untuk barchart container */}
                    <div class="barchartReport-container">
                        <div class="top-table">
                            <div class="search-container">
                                <div class="search-input">
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="filter-text-box"
                                        placeholder="Search..."
                                    />
                                    <span class="search-icon">
                                        <Icon icon="ic:baseline-search" color="gray" width="16" height="16" />
                                    </span>
                                </div>
                                <button class="btn-sort"><Icon icon="gg:sort-za" color="white" width="25" height="25" /></button>
                            </div>
                        </div>

                        <div class="keuanganModul-dashboard-container">
                            {/* div untuk card chart total pada keuangan dashboard */}
                            <div class="all-report-card">
                                <A href="/report/pemasukan" classList={{ active: location.pathname.startsWith('/report') }}>
                                <div class="report-case">
                                    <div class="card-title">Pemasukan</div>
                                    <div class="card-total" style={{ "color": "#a155b9" }}>Rp 128.550,00</div>
                                </div>
                                </A>
                                <A href="/report/pengeluaran" classList={{ active: location.pathname.startsWith('/report') }}>
                                <div class="report-case">
                                    <div class="card-title">Pengeluaran</div>
                                    <div class="card-total" style={{ "color": "#f765b3" }}>Rp 56.240,00</div>
                                </div>
                                </A>
                            </div>
                            <div class="all-report-card">
                                <A href="/report/kas_besar" classList={{ active: location.pathname.startsWith('/report') }}>
                                <div class="report-case">
                                    <div class="card-title">Kas Besar</div>
                                    <div class="card-total" style={{ "color": "#165baa" }}>Rp 48.524,00</div>
                                </div>
                                </A>
                                <div class="report-case">
                                    <div class="card-title">Kas Kecil</div>
                                    <div class="card-total" style={{ "color": "#FF8C00" }}>Rp 28.000,00</div>
                                </div>
                            </div>

                            {/* div untuk card chart total pada keuangan dashboard dan grafik keuangan dashboard */}
                            <div class="chart-total-keuanganModul">
                                <div class="card-total-container">
                                    <div class="total-title">
                                        Total
                                    </div>
                                    <div class="card-total2">
                                        5.987,37
                                    </div>
                                    <div class="card-total3">
                                        Rp
                                    </div>
                                </div>

                                <div class="grafik-keuangan-dashboard-container">
                                    <Grafik_keuangan_dashboard />
                                </div>
                            </div>
                        </div>

                        <div class="barchartInexReport">
                            <Barchart_inex_report />
                        </div>
                    </div>

                    {/* div untuk income container dan expenses container */}
                    <div class="inex-container" style={{
                        "margin-top": "25px",
                        "justify-content": "center",
                        "text-align": "center",
                        "align-items": "center",
                        "display": "flex"
                    }}>
                        {/* ====== button untuk menampilkan tabel income ====== */}
                        <div>
                            <button onClick={toggleIncomeTable} class={`button-toggle ${showIncomeTable() ? 'active' : ''}`} style={{
                                "width": "242px",
                                "height": "68px",
                                "background-color": showIncomeTable() ? "#6E49E9" : "#8467FFCC",
                                "border-radius": "10px",
                                "border": "1px solid rgba(128, 128, 128, 0.20)",
                                "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
                                "margin-right": "20px",
                                "position": "relative"

                            }}>
                                <div class="inexcome-info">
                                    <div class="inexcome-title" style={{
                                        "display": "flex",
                                        "padding-left": "20px",
                                        "padding-top": "5px"
                                    }}>
                                        <img src="src/assets/img/money-recive.png" alt="money-recive.png" style={{ "width": "27px", "height": "27px" }} />
                                        <p style={{
                                            "padding-left": "20px",
                                            "font-weight": "500", "font-size": "18px"
                                        }}>Total Pemasukan</p>
                                    </div>

                                    <div class="inexcome-amount" style={{
                                        "margin-left": "18px",
                                        "font-weight": "500",
                                        "font-size": "18px"
                                    }}>
                                        <p>Rp133.890.000</p>
                                    </div>
                                </div>
                                {showIncomeTable()}
                            </button>
                        </div>

                        {/* ====== button untuk menampilkan tabel expenses ====== */}
                        <div>
                            <button onClick={toggleExpensesTable} class={`button-toggle ${showExpensesTable() ? 'active' : ''}`} style={{
                                "width": "242px",
                                "height": "68px",
                                "background-color": showExpensesTable() ? "#8A8A8B" : "#80808033",
                                "border-radius": "10px",
                                "border": "1px solid rgba(128, 128, 128, 0.20)",
                                "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.2)",
                                "margin-right": "20px",
                                "position": "relative"
                            }}>
                                <div class="inexcome-info">
                                    <div class="inexcome-title" style={{
                                        "display": "flex",
                                        "padding-left": "20px",
                                        "padding-top": "5px"
                                    }}>
                                        <img src="src/assets/img/money-send.png" alt="money-send.png" style={{ "width": "27px", "height": "27px" }} />
                                        <p style={{
                                            "padding-left": "20px",
                                            "font-weight": "500", "font-size": "18px"
                                        }}>Total Pengeluaran</p>
                                    </div>

                                    <div class="inexcome-amount" style={{
                                        "margin-left": "18px",
                                        "font-weight": "500",
                                        "font-size": "18px"
                                    }}>
                                        <p>Rp233.890.000</p>
                                    </div>
                                </div>

                                {showExpensesTable()}
                            </button>
                        </div>
                    </div>

                    {/* div untuk piechart income, tabel, dan piechart excome */}
                    <div class="pietab-inex-container">

                        <div class="tabel-inex-container" style={{ "padding-top": "25px" }}>
                            {showIncomeTable() && <Table_income_report />}
                            {showExpensesTable() && <Table_expenses_report />}
                        </div>

                        <div class="piechart-container">
                            <Piechart_report />
                        </div>
                    </div>

                    {/* div untuk barchart arus kas report */}
                    <p style={{ "margin": "22px", "color": "#414141","font-size": "18px", "font-style": "normal", "font-weight": "700", "line-height": "normal" , "font-family":"Exo"}}>Arus Kas</p>
                    <div class="barchart-aruskas-container" style={{ "margin-bottom": "5.5rem" }}>
                        <Barchart_aruskas_report />
                    </div>

                    {/* div untuk barchart laba rugi */}
                    <p style={{ "margin": "22px", "color": "#414141", "font-size": "18px", "font-style": "normal", "font-weight": "700", "line-height": "normal", "font-family":"Exo" }}>Laba Rugi</p>
                    <div class="barchart-labarugi-container" >
                        <Barchart_labarugi_report />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Report;